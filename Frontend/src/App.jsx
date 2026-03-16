import Signup            from "./UI/pages/Signup";
import OtpGeneration     from "./UI/pages/OtpGeneration";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BuyLaptops        from "./UI/pages/services/BuyLaptops";
import SellOldLaptops    from "./UI/pages/SellOldLaptops";
import SellPhones        from "./UI/pages/SellPhones";
import SellSmartSpeakers from "./UI/pages/SellSmartSpeakers";
import SellSmartWatch    from "./UI/pages/SellSmartWatch";
import SellTablet        from "./UI/pages/SellTablet";
import SellTV            from "./UI/pages/SellTV";
import ProductDetails    from "./UI/pages/ProductDetails";
import Home              from "./UI/pages/Home";
import Recycle           from "./UI/pages/services/Recycle";
import FindNewPhone      from "./UI/pages/FindNewPhone";
import Login             from "./UI/pages/Login";
import NavBar            from "./UI/components/NavBar";
import { AuthProvider }  from "./context/auth.context";
import { AdminProvider } from "./context/admin.context";
import { SubscriptionProvider } from "./context/subscription.context";
import SubscriptionFlow  from "./UI/pages/SubscriptionFlow";
import { ProductProvider } from "./context/product.context";
import { BuySellProvider } from "./context/buysell.context";
import AdminDashboard    from "./UI/pages/Admindashboard";
import { useAuth }      from "./UI/hooks/useAuth";
import AddProduct        from "./UI/pages/AddProduct";
import Refurbishedmobiles from "./UI/pages/Refurbishedmobiles";
import SellerDashboard   from "./UI/pages/SellerDashboard";
import Sellerorders      from "./UI/pages/Sellerorders";

// ─── AdminRoute ───────────────────────────────────────────────────────────────

function AdminRoute({ children }) {
  const { user, isAuthenticated, initializing } = useAuth();
  if (initializing) return <LoadingScreen />;
  if (!isAuthenticated)       return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/"      replace />;
  return children;
}

// ─── SellerRoute ──────────────────────────────────────────────────────────────

function SellerRoute({ children }) {
  const { user, isAuthenticated, initializing } = useAuth();
  if (initializing) return <LoadingScreen />;
  if (!isAuthenticated)        return <Navigate to="/login"     replace />;
  if (user?.role !== "seller") return <Navigate to="/subscribe" replace />;
  return children;
}

// ─── Shared loading screen ────────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f1f5f9",
      fontFamily: "sans-serif", color: "#94a3b8", fontSize: 14,
    }}>
      Loading...
    </div>
  );
}

// ─── Layouts ──────────────────────────────────────────────────────────────────

function BareLayout({ children }) { return <>{children}</>; }

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ProductProvider>
          <BuySellProvider>
          <SubscriptionProvider>
            <BrowserRouter>
              <Routes>

                {/* ── Admin dashboard — no navbar, admin-only ── */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <BareLayout>
                        <AdminDashboard />
                      </BareLayout>
                    </AdminRoute>
                  }
                />

                {/* ── Seller routes — no navbar, seller-only ── */}
                <Route
                  path="/seller-dashboard"
                  element={
                    <SellerRoute>
                      <BareLayout>
                        <SellerDashboard />
                      </BareLayout>
                    </SellerRoute>
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    <SellerRoute>
                      <BareLayout>
                        <AddProduct />
                      </BareLayout>
                    </SellerRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <SellerRoute>
                      <BareLayout>
                        <Sellerorders />
                      </BareLayout>
                    </SellerRoute>
                  }
                />

                {/* ── All other routes — with navbar ── */}
                <Route
                  path="/*"
                  element={
                    <MainLayout>
                      <Routes>
                        <Route path="/"          element={<Home />} />
                        <Route path="/login"     element={<Login />} />
                        <Route path="/signup"    element={<Signup />} />
                        <Route path="/otp"       element={<OtpGeneration />} />
                        <Route path="/subscribe" element={<SubscriptionFlow />} />
                        <Route path="/filter-by" element={<Refurbishedmobiles />} />
                      </Routes>
                    </MainLayout>
                  }
                />

              </Routes>
            </BrowserRouter>
          </SubscriptionProvider>
          </BuySellProvider>
        </ProductProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;