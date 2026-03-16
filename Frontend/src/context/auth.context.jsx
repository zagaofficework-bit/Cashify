import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,         setUser]         = useState(null);
  const [loading,      setLoading]      = useState(false);

  // ─── initializing stays true until getMe() resolves on first mount ───────────
  // This is the single source of truth — no component should redirect
  // until this flips to false.
  const [initializing, setInitializing] = useState(true);

  // ─── Restore session ONCE at the app root level ───────────────────────────────
  // Doing this here (not in useAuth hook) ensures it runs exactly once
  // and every consumer — including AdminRoute — sees the same state.
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        // Token invalid or expired — clear it
        if (err?.response?.status === 401) {
          localStorage.removeItem("accessToken");
        }
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };

    restoreSession();
  }, []);

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        initializing,         // ← AdminRoute waits on this
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used inside <AuthProvider>");
  return context;
};