<<<<<<< HEAD
const express  = require("express");
const router   = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const adminOnly          = require("../middleware/Adminonly.middleware");
const {
  placeCODOrder,
  createStripePaymentIntent,
  stripeWebhook,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} = require("../controller/order.controller");

// ⚠️ Webhook MUST use raw body — registered BEFORE express.json()
// Handle this in app.js (see below)

// ─── Public/User Routes ───────────────────────────────────────────
router.post("/place/cod",    authMiddleware, placeCODOrder);
router.post("/place/stripe", authMiddleware, createStripePaymentIntent);
router.get( "/my-orders",    authMiddleware, getMyOrders);
router.get( "/:id",          authMiddleware, getOrderById);
router.patch("/:id/cancel",  authMiddleware, cancelOrder);

// ─── Admin Routes ─────────────────────────────────────────────────
router.patch("/:id/status", ...adminOnly, updateOrderStatus);
=======
const express = require("express");
const router  = express.Router();

const BuySellController = require("../controller/buySell.controller");

const {
  authMiddleware,
  authorize,
  blockAdmin,
} = require("../middleware/auth.middleware");

////////////////////////////////////////////////////////////////////
//// BUY ROUTES
////////////////////////////////////////////////////////////////////

/**
 * @route   POST /api/orders/products/:id/buy
 * @desc    Buyer places an order request — payment collected upfront
 *          Order sits as "pending" until seller confirms
 *          - user   → can only buy from seller
 *          - seller → can buy from seller or user
 * @access  Private (Seller, User)
 * @body    { paymentMethod: "Cash" | "UPI" | "Card" | "NetBanking" }
 */
router.post(
  "/products/:id/buy",
  authMiddleware,
  authorize("seller", "user"),
  blockAdmin,
  BuySellController.buyProduct
);

/**
 * @route   POST /api/orders/:orderId/confirm
 * @desc    Seller confirms a buyer's pending order
 *          → status: "confirmed", product marked as sold
 * @access  Private (Seller only)
 */
router.post(
  "/:orderId/confirm",
  authMiddleware,
  authorize("seller"),
  BuySellController.confirmBuyOrder
);

/**
 * @route   POST /api/orders/:orderId/reject
 * @desc    Seller rejects a buyer's pending order
 *          → status: "rejected", product back to available
 * @access  Private (Seller only)
 * @body    { reason } (optional)
 */
router.post(
  "/:orderId/reject",
  authMiddleware,
  authorize("seller"),
  BuySellController.rejectBuyOrder
);

/**
 * @route   POST /api/orders/:orderId/cancel
 * @desc    Buyer cancels their own pending order
 *          → status: "cancelled", product back to available
 * @access  Private (Seller, User — buyer only)
 */
router.post(
  "/:orderId/cancel",
  authMiddleware,
  authorize("seller", "user"),
  BuySellController.cancelBuyOrder
);

////////////////////////////////////////////////////////////////////
//// SELL ROUTES
////////////////////////////////////////////////////////////////////

/**
 * @route   POST /api/orders/sell-request
 * @desc    User submits their device to a seller for a quote
 *          → status: "pending" until seller confirms
 * @access  Private (User only)
 * @body    { sellerId, deviceDetails, expectedPrice, paymentMethod }
 */
router.post(
  "/sell-request",
  authMiddleware,
  authorize("user"),
  BuySellController.sellDeviceToSeller
);

/**
 * @route   PATCH /api/orders/sell-request/:orderId/confirm
 * @desc    Seller confirms a user's sell request
 *          → status: "completed", payment settled
 * @access  Private (Seller only)
 */
router.patch(
  "/sell-request/:orderId/confirm",
  authMiddleware,
  authorize("seller"),
  BuySellController.confirmSellRequest
);

////////////////////////////////////////////////////////////////////
//// ORDER HISTORY & PENDING
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/orders/pending
 * @desc    Seller sees all incoming buy requests waiting for confirmation
 * @access  Private (Seller only)
 */
router.get(
  "/pending",
  authMiddleware,
  authorize("seller"),
  BuySellController.getSellerPendingOrders
);

/**
 * @route   GET /api/orders/my
 * @desc    Get own order history (buy + sell)
 * @access  Private (Seller, User)
 * @query   ?type=buy&status=pending&page=1&limit=10
 */
router.get(
  "/my",
  authMiddleware,
  authorize("seller", "user"),
  BuySellController.getMyOrders
);
>>>>>>> 80d58d1f2394029ee0f025a0ebb8928d0593bf2e

module.exports = router;