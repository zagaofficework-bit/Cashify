import { createContext, useContext, useState } from "react";
import {
  getAllOrders,
  getSubscribedSellers,
  getSellerSubscriptionDetail,
  adminDeleteProduct,
  pauseSeller,
  banSeller,
  reinstateSeller,
} from "../services/admin.api";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {

  // ─── Orders ───────────────────────────────────────────────────────────────
  const [orders, setOrders]                   = useState([]);
  const [orderPagination, setOrderPagination] = useState({});

  // ─── Sellers / Subscriptions ──────────────────────────────────────────────
  const [sellers, setSellers]                       = useState([]);
  const [sellerPagination, setSellerPagination]     = useState({});
  const [selectedSeller, setSelectedSeller]         = useState(null); // full detail view

  // ─── Commission summary (from getAllOrders) ───────────────────────────────
  const [commissionSummary, setCommissionSummary]   = useState(null);

  // ─── Shared loading / error ───────────────────────────────────────────────
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const handleError = (err) => {
    setError(err.message || "Something went wrong");
    setLoading(false);
  };

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  ////////////////////////////////////////////////////////////////////
  //// ORDERS
  ////////////////////////////////////////////////////////////////////

  // GET /admin/orders?type=buy&status=confirmed&page=1&limit=20
  const fetchOrders = async (filters = {}) => {
    startLoading();
    try {
      const res = await getAllOrders(filters);
      setOrders(res.orders ?? []);
      setOrderPagination(res.pagination ?? {});
      setCommissionSummary(res.commissionSummary ?? null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// SELLERS & SUBSCRIPTIONS
  ////////////////////////////////////////////////////////////////////

  // GET /admin/subscriptions?status&plan&page&limit
  const fetchSellers = async (filters = {}) => {
    startLoading();
    try {
      const res = await getSubscribedSellers(filters);
      setSellers(res.sellers ?? []);
      setSellerPagination(res.pagination ?? {});
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // GET /admin/subscriptions/:sellerId — full detail
  const fetchSellerDetail = async (sellerId) => {
    startLoading();
    try {
      const res = await getSellerSubscriptionDetail(sellerId);
      setSelectedSeller(res.data ?? null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// PRODUCTS
  ////////////////////////////////////////////////////////////////////

  // DELETE /admin/products/:id
  const deleteProduct = async (productId) => {
    startLoading();
    try {
      await adminDeleteProduct(productId);
      // No local state to update — caller should refetch
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////
  //// SELLER CONTROLS
  ////////////////////////////////////////////////////////////////////

  // POST /admin/sellers/:sellerId/pause
  const pauseSellerAccount = async (sellerId, reason) => {
    startLoading();
    try {
      const res = await pauseSeller(sellerId, reason);
      // Update seller in local list
      setSellers((prev) =>
        prev.map((s) =>
          s.seller.id === sellerId
            ? { ...s, seller: { ...s.seller, accountStatus: "suspended" }, subscription: { ...s.subscription, adminStatus: "paused" } }
            : s
        )
      );
      // Update detail view if open
      if (selectedSeller?.seller?.id === sellerId) {
        setSelectedSeller((prev) => ({
          ...prev,
          seller:       { ...prev.seller, accountStatus: "suspended" },
          subscription: { ...prev.subscription, adminStatus: "paused" },
        }));
      }
      return res;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // POST /admin/sellers/:sellerId/ban
  const banSellerAccount = async (sellerId, reason) => {
    startLoading();
    try {
      const res = await banSeller(sellerId, reason);
      // Remove from sellers list (banned sellers shouldn't show in active list)
      setSellers((prev) => prev.filter((s) => s.seller.id !== sellerId));
      if (selectedSeller?.seller?.id === sellerId) {
        setSelectedSeller((prev) => ({
          ...prev,
          seller: { ...prev.seller, accountStatus: "banned" },
        }));
      }
      return res;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // POST /admin/sellers/:sellerId/reinstate
  const reinstateSellerAccount = async (sellerId, note = "") => {
    startLoading();
    try {
      const res = await reinstateSeller(sellerId, note);
      // Update seller status in local list
      setSellers((prev) =>
        prev.map((s) =>
          s.seller.id === sellerId
            ? { ...s, seller: { ...s.seller, accountStatus: "active" }, subscription: { ...s.subscription, adminStatus: "active" } }
            : s
        )
      );
      if (selectedSeller?.seller?.id === sellerId) {
        setSelectedSeller((prev) => ({
          ...prev,
          seller:       { ...prev.seller, accountStatus: "active" },
          subscription: { ...prev.subscription, adminStatus: "active" },
        }));
      }
      return res;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ─── Clear selected seller (close detail view) ────────────────────────────
  const clearSelectedSeller = () => setSelectedSeller(null);

  // ─── Clear error ──────────────────────────────────────────────────────────
  const clearError = () => setError(null);

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <AdminContext.Provider value={{
      // State
      orders,
      orderPagination,
      commissionSummary,
      sellers,
      sellerPagination,
      selectedSeller,
      loading,
      error,

      // Orders
      fetchOrders,

      // Sellers
      fetchSellers,
      fetchSellerDetail,
      clearSelectedSeller,

      // Products
      deleteProduct,

      // Seller controls
      pauseSellerAccount,
      banSellerAccount,
      reinstateSellerAccount,

      // Utils
      clearError,
    }}>
      {children}
    </AdminContext.Provider>
  );
};