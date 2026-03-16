import { useState } from "react";
import { useAuthContext } from "../../context/auth.context";
import {
  login,
  verifyLoginOtp,
  verifyRegisterOtp,
  register,
  logout,
} from "../../services/auth.api";

export const useAuth = () => {
  const {
    user,
    setUser,
    loading,
    setLoading,
    initializing,
    isAuthenticated,
    updateUser,
  } = useAuthContext();

  const [otpSent,         setOtpSent]         = useState(false);
  const [otpTarget,       setOtpTarget]        = useState(null);
  const [error,           setError]            = useState(null);
  const [successMessage,  setSuccessMessage]   = useState(null);

  ////////////////////////////////////////////////////////////////////
  //// SESSION TOKEN — survives navigation between Login → OTP page
  ////////////////////////////////////////////////////////////////////

  const saveSessionToken  = (t) => sessionStorage.setItem("sessionToken", t);
  const getSessionToken   = ()  => sessionStorage.getItem("sessionToken");
  const clearSessionToken = ()  => sessionStorage.removeItem("sessionToken");

  ////////////////////////////////////////////////////////////////////
  //// REGISTER
  ////////////////////////////////////////////////////////////////////

  const handleRegister = async ({ email, firstname, lastname, mobile }) => {
    setError(null);
    try {
      const data = await register({ email, firstname, lastname, mobile });
      saveSessionToken(data.sessionToken);
      setOtpSent(true);
      setOtpTarget("register");
      setSuccessMessage(data.message || "OTP sent to your email");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again");
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// VERIFY REGISTER OTP
  ////////////////////////////////////////////////////////////////////

  const handleVerifyRegisterOtp = async ({ otp }) => {
    setError(null);
    try {
      const sessionToken = getSessionToken();
      if (!sessionToken) { setError("Session expired. Please register again"); return; }

      const data = await verifyRegisterOtp({ otp, sessionToken });
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      clearSessionToken();
      setOtpSent(false);
      setSuccessMessage("Registered successfully!");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP");
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// LOGIN
  ////////////////////////////////////////////////////////////////////

  const handleLogin = async ({ email }) => {
    setError(null);
    try {
      const data = await login({ email });
      saveSessionToken(data.sessionToken);
      setOtpSent(true);
      setOtpTarget("login");
      setSuccessMessage(data.message || "OTP sent to your email");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again");
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// VERIFY LOGIN OTP
  ////////////////////////////////////////////////////////////////////

  const handleVerifyLoginOtp = async ({ otp }) => {
    setError(null);
    try {
      const sessionToken = getSessionToken();
      if (!sessionToken) { setError("Session expired. Please login again"); return; }

      const data = await verifyLoginOtp({ otp, sessionToken });
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      clearSessionToken();
      setOtpSent(false);
      setSuccessMessage("Logged in successfully!");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP");
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// LOGOUT
  ////////////////////////////////////////////////////////////////////

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
    } catch (_) {
      // logout API failing shouldn't block local cleanup
    } finally {
      localStorage.removeItem("accessToken");
      clearSessionToken();
      setUser(null);
      setOtpSent(false);
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// HELPERS
  ////////////////////////////////////////////////////////////////////

  const clearError   = () => setError(null);
  const clearMessage = () => setSuccessMessage(null);

  return {
    user,
    loading,
    initializing,
    isAuthenticated,
    isAdmin:  user?.role === "admin",
    isSeller: user?.role === "seller",
    isUser:   user?.role === "user",

    otpSent,
    otpTarget,
    error,
    successMessage,

    handleRegister,
    handleVerifyRegisterOtp,
    handleLogin,
    handleVerifyLoginOtp,
    handleLogout,

    updateUser,
    clearError,
    clearMessage,
  };
};