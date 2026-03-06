const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  placeOrder,
  getMyOrders,
  getMySales,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.post("/place", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/my-sales", authMiddleware, getMySales);
router.get("/:id", authMiddleware, getOrderById);
router.patch("/:id/cancel", authMiddleware, cancelOrder);
router.patch("/:id/status", authMiddleware, updateOrderStatus);

module.exports = router;