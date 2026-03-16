import { useEffect } from "react";
import { useAdminContext } from "../../context/admin.context";

// ─── Base hook — access everything from context ───────────────────────────────

export const useAdmin = () => useAdminContext();

////////////////////////////////////////////////////////////////////
//// ORDERS
////////////////////////////////////////////////////////////////////

/**
 * useAdminOrders
 * Fetches all orders on mount. Accepts optional initial filters.
 *
 * Usage:
 *   const { orders, orderPagination, commissionSummary, loading, error, fetchOrders } = useAdminOrders();
 *   const { orders } = useAdminOrders({ status: "pending", type: "buy" });
 */
export const useAdminOrders = (initialFilters = {}) => {
  const { orders, orderPagination, commissionSummary, loading, error, fetchOrders } = useAdminContext();

  useEffect(() => {
    fetchOrders(initialFilters);
  }, []);

  return { orders, orderPagination, commissionSummary, loading, error, fetchOrders };
};

////////////////////////////////////////////////////////////////////
//// SELLERS & SUBSCRIPTIONS
////////////////////////////////////////////////////////////////////

/**
 * useAdminSellers
 * Fetches subscribed sellers on mount. Accepts optional initial filters.
 *
 * Usage:
 *   const { sellers, sellerPagination, loading, error, fetchSellers } = useAdminSellers();
 *   const { sellers } = useAdminSellers({ plan: "premium" });
 *   const { sellers } = useAdminSellers({ status: "paused" });
 */
export const useAdminSellers = (initialFilters = {}) => {
  const { sellers, sellerPagination, loading, error, fetchSellers } = useAdminContext();

  useEffect(() => {
    fetchSellers(initialFilters);
  }, []);

  return { sellers, sellerPagination, loading, error, fetchSellers };
};

/**
 * useSellerDetail
 * Fetches full seller detail (subscription + products) when sellerId is provided.
 *
 * Usage:
 *   const { selectedSeller, loading, error } = useSellerDetail(sellerId);
 */
export const useSellerDetail = (sellerId) => {
  const { selectedSeller, loading, error, fetchSellerDetail, clearSelectedSeller } = useAdminContext();

  useEffect(() => {
    if (sellerId) fetchSellerDetail(sellerId);
    return () => clearSelectedSeller(); // cleanup on unmount
  }, [sellerId]);

  return { seller: selectedSeller, loading, error };
};

////////////////////////////////////////////////////////////////////
//// SELLER CONTROLS
////////////////////////////////////////////////////////////////////

/**
 * useSellerControls
 * Exposes pause, ban, and reinstate actions with shared loading/error state.
 *
 * Usage:
 *   const { pauseSeller, banSeller, reinstateSeller, loading, error } = useSellerControls();
 *
 *   await pauseSeller(sellerId, "Suspicious activity");
 *   await banSeller(sellerId, "Fraud confirmed");
 *   await reinstateSeller(sellerId, "Issue resolved");
 */
export const useSellerControls = () => {
  const {
    loading,
    error,
    clearError,
    pauseSellerAccount,
    banSellerAccount,
    reinstateSellerAccount,
  } = useAdminContext();

  return {
    loading,
    error,
    clearError,
    pauseSeller:      pauseSellerAccount,
    banSeller:        banSellerAccount,
    reinstateSeller:  reinstateSellerAccount,
  };
};

////////////////////////////////////////////////////////////////////
//// PRODUCTS
////////////////////////////////////////////////////////////////////

/**
 * useAdminProducts
 * Exposes admin product deletion action.
 *
 * Usage:
 *   const { deleteProduct, loading, error } = useAdminProducts();
 *   const success = await deleteProduct(productId);
 */
export const useAdminProducts = () => {
  const { deleteProduct, loading, error, clearError } = useAdminContext();

  return { deleteProduct, loading, error, clearError };
};

////////////////////////////////////////////////////////////////////
//// COMBINED — for admin dashboard overview
////////////////////////////////////////////////////////////////////

/**
 * useAdminDashboard
 * Fetches both orders and sellers simultaneously on mount.
 * Use this on the main admin dashboard page.
 *
 * Usage:
 *   const {
 *     orders, commissionSummary,
 *     sellers,
 *     loading, error
 *   } = useAdminDashboard();
 */
export const useAdminDashboard = () => {
  const {
    orders,
    commissionSummary,
    sellers,
    loading,
    error,
    fetchOrders,
    fetchSellers,
  } = useAdminContext();

  useEffect(() => {
    fetchOrders({ limit: 5 });   // recent 5 orders for dashboard summary
    fetchSellers({ limit: 5 });  // recent 5 sellers
  }, []);

  return { orders, commissionSummary, sellers, loading, error };
};