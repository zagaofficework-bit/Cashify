const express = require("express");
const router  = express.Router();

const ProductController      = require("../controller/product.controller");
const SubscriptionController = require("../controller/subscription.controller");

const {
  authMiddleware,
  authorize,
} = require("../middleware/auth.middleware");

// All admin routes are protected — apply authMiddleware + authorize globally
router.use(authMiddleware);
router.use(authorize("admin"));

////////////////////////////////////////////////////////////////////
//// SUBSCRIPTION MANAGEMENT
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/admin/subscriptions
 * @desc    Get all subscriptions with pagination and filters
 * @access  Private (Admin only)
 * @query   ?plan=basic&isActive=true&page=1&limit=20
 */
router.get(
  "/subscriptions",
  SubscriptionController.getAllSubscriptions
);

/**
 * @route   DELETE /api/admin/subscriptions/:userId/revoke
 * @desc    Revoke a seller's subscription — role reverts to user
 * @access  Private (Admin only)
 */
router.delete(
  "/subscriptions/:userId/revoke",
  SubscriptionController.revokeSubscription
);

////////////////////////////////////////////////////////////////////
//// PRODUCT MANAGEMENT
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/admin/products
 * @desc    Get all product listings across all sellers and users
 * @access  Private (Admin only)
 * @query   ?status=available&category=mobile&page=1&limit=20
 */
router.get(
  "/products",
  ProductController.getProducts
);

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Remove any product listing from the platform
 * @access  Private (Admin only)
 */
router.delete(
  "/products/:id",
  ProductController.adminDeleteProduct
);

////////////////////////////////////////////////////////////////////
//// ORDER & COMMISSION MANAGEMENT
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders + total commission earned by admin
 * @access  Private (Admin only)
 * @query   ?type=buy&status=completed&page=1&limit=20
 */
router.get(
  "/orders",
  ProductController.getAllOrders
);

module.exports = router;