import { useEffect } from "react";
import { useBuySellContext } from "../../context/buysell.context";

// ─── Base hook — access everything ────────────────────────────────────────────
export const useBuySell = () => useBuySellContext();

// ─── Seller: fetch pending orders on mount ────────────────────────────────────
// Use on the Seller Orders / Dashboard page to auto-load incoming requests
//
// const { pendingOrders, loading, error, confirmOrder, rejectOrder } = useSellerPendingOrders();
export const useSellerPendingOrders = () => {
  const {
    pendingOrders,
    loading,
    error,
    fetchPendingOrders,
    confirmOrder,
    rejectOrder,
    changeOrderStatus,
  } = useBuySellContext();

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return {
    pendingOrders,
    loading,
    error,
    confirmOrder,
    rejectOrder,
    changeOrderStatus,
    refetch: fetchPendingOrders,
  };
};

// ─── Fetch own order history on mount ─────────────────────────────────────────
// Pass optional filters: { type, status, page, limit }
//
// const { myOrders, loading, pagination } = useMyOrders({ type: "buy" });
export const useMyOrders = (filters = {}) => {
  const {
    myOrders,
    loading,
    error,
    pagination,
    fetchMyOrders,
    cancelOrder,
    changeOrderStatus,
  } = useBuySellContext();

  useEffect(() => {
    fetchMyOrders(filters);
  }, []);

  return {
    myOrders,
    loading,
    error,
    pagination,
    cancelOrder,
    changeOrderStatus,
    refetch: (newFilters = {}) => fetchMyOrders({ ...filters, ...newFilters }),
  };
};

// ─── Place a buy order (used on product detail page) ──────────────────────────
// Does NOT auto-fetch — call placeOrder manually on button click
//
// const { placeOrder, loading, error } = usePlaceOrder();
// await placeOrder(productId, "UPI");
export const usePlaceOrder = () => {
  const { placeOrder, loading, error } = useBuySellContext();
  return { placeOrder, loading, error };
};

// ─── Seller order management (confirm / reject / update status) ───────────────
// Does NOT auto-fetch — compose with useSellerPendingOrders if you need the list
//
// const { confirmOrder, rejectOrder, changeOrderStatus, loading } = useOrderActions();
export const useOrderActions = () => {
  const {
    confirmOrder,
    rejectOrder,
    cancelOrder,
    changeOrderStatus,
    loading,
    error,
  } = useBuySellContext();

  return {
    confirmOrder,
    rejectOrder,
    cancelOrder,
    changeOrderStatus,
    loading,
    error,
  };
};