import { createContext, useContext, useState, useCallback } from "react";
import {
  buyProduct        as apiBuyProduct,
  confirmOrder      as apiConfirmOrder,
  rejectOrder       as apiRejectOrder,
  cancelOrder       as apiCancelOrder,
  getSellerPendingOrders as apiGetSellerPendingOrders,
  getMyOrders       as apiGetMyOrders,
  updateOrderStatus as apiUpdateOrderStatus,
} from "../services/buysell.api";

// ─── Context ───────────────────────────────────────────────────────────────────
const BuySellContext = createContext();

export const useBuySellContext = () => useContext(BuySellContext);

// ─── Provider ──────────────────────────────────────────────────────────────────
export const BuySellProvider = ({ children }) => {

  // ── State ────────────────────────────────────────────────────────────────────
  const [pendingOrders, setPendingOrders] = useState([]);   // seller's incoming requests
  const [myOrders,      setMyOrders]      = useState([]);   // buyer/seller own history
  const [pagination,    setPagination]    = useState({});
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(null);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const handleError = (err) => {
    setError(err.message || "Something went wrong");
    setLoading(false);
  };

  const withLoading = useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Replace a single order in both lists after a status change ───────────────
  const patchOrder = (updatedOrder) => {
    const id = updatedOrder._id;
    setPendingOrders((prev) =>
      // remove from pending if no longer pending
      updatedOrder.status === "pending"
        ? prev.map((o) => (o._id === id ? updatedOrder : o))
        : prev.filter((o) => o._id !== id)
    );
    setMyOrders((prev) =>
      prev.map((o) => (o._id === id ? updatedOrder : o))
    );
  };

  // ─── ACTIONS ─────────────────────────────────────────────────────────────────

  /**
   * Buyer places an order for a product.
   * @param {string} productId
   * @param {string} paymentMethod  "Cash" | "UPI" | "Card" | "NetBanking"
   * @returns {object|null}  { orderId, status, paymentStatus, breakdown, ... }
   */
  const placeOrder = useCallback((productId, paymentMethod) =>
    withLoading(async () => {
      const res = await apiBuyProduct(productId, paymentMethod);
      // Optimistically add to myOrders so UI reflects immediately
      if (res?.data) {
        setMyOrders((prev) => [res.data, ...prev]);
      }
      return res?.data ?? null;
    }),
  [withLoading]);

  /**
   * Seller confirms a pending buy order.
   * @param {string} orderId
   * @returns {object|null}
   */
  const confirmOrder = useCallback((orderId) =>
    withLoading(async () => {
      const res = await apiConfirmOrder(orderId);
      // Remove from pending list, update in myOrders
      setPendingOrders((prev) => prev.filter((o) => o._id !== orderId));
      setMyOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "confirmed" } : o
        )
      );
      return res?.data ?? null;
    }),
  [withLoading]);

  /**
   * Seller rejects a pending buy order.
   * @param {string} orderId
   * @param {string} [reason]
   * @returns {object|null}
   */
  const rejectOrder = useCallback((orderId, reason = "") =>
    withLoading(async () => {
      const res = await apiRejectOrder(orderId, reason);
      setPendingOrders((prev) => prev.filter((o) => o._id !== orderId));
      setMyOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "rejected" } : o
        )
      );
      return res?.data ?? null;
    }),
  [withLoading]);

  /**
   * Buyer cancels their own pending order.
   * @param {string} orderId
   * @returns {object|null}
   */
  const cancelOrder = useCallback((orderId) =>
    withLoading(async () => {
      const res = await apiCancelOrder(orderId);
      setMyOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );
      return res?.data ?? null;
    }),
  [withLoading]);

  /**
   * Seller fetches all pending buy requests waiting for confirmation.
   * Populates `pendingOrders`.
   */
  const fetchPendingOrders = useCallback(() =>
    withLoading(async () => {
      const res = await apiGetSellerPendingOrders();
      setPendingOrders(res?.orders ?? []);
      return res?.orders ?? [];
    }),
  [withLoading]);

  /**
   * Fetch own order history (buyer + seller combined).
   * @param {{ type?: string, status?: string, page?: number, limit?: number }} filters
   */
  const fetchMyOrders = useCallback((filters = {}) =>
    withLoading(async () => {
      const res = await apiGetMyOrders(filters);
      setMyOrders(res?.orders ?? []);
      setPagination(res?.pagination ?? {});
      return res?.orders ?? [];
    }),
  [withLoading]);

  /**
   * Update an order's status (seller or buyer).
   * @param {string} orderId
   * @param {string} status
   * @returns {object|null} updated order
   */
  const changeOrderStatus = useCallback((orderId, status) =>
    withLoading(async () => {
      const res = await apiUpdateOrderStatus(orderId, status);
      if (res?.data) patchOrder(res.data);
      return res?.data ?? null;
    }),
  [withLoading]);

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <BuySellContext.Provider value={{
      // state
      pendingOrders,
      myOrders,
      pagination,
      loading,
      error,

      // actions
      placeOrder,
      confirmOrder,
      rejectOrder,
      cancelOrder,
      fetchPendingOrders,
      fetchMyOrders,
      changeOrderStatus,
    }}>
      {children}
    </BuySellContext.Provider>
  );
};