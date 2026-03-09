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
} = require("../controllers/order.controller");

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

module.exports = router;