const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");

const {
  authMiddleware,
  authorize,
  blockAdmin,
  checkAccountStatus,
  requireActiveSubscription,
  checkListingLimit,
  checkDeviceTypePermission,
  optionalAuthenticate,
} = require("../middleware/auth.middleware");

const {
  productUpload,
  validateProductFiles,
} = require("../middleware/multer.middleware");

////////////////////////////////////////////////////////////////////
//// PUBLIC ROUTES
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/products
 * @desc    Get all products (supports location filter)
 * @access  Public
 * @query   ?latitude=28.6&longitude=77.2&radius=5&category=mobile&minPrice=5000
 */
router.get("/", optionalAuthenticate, ProductController.getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", optionalAuthenticate, ProductController.getProductById);

////////////////////////////////////////////////////////////////////
//// MY LISTINGS
////////////////////////////////////////////////////////////////////

/**
 * @route   GET /api/products/my/listings
 * @desc    Get own product listings
 * @access  Private (Seller, User)
 * @query   ?status=available
 */
router.get(
  "/my/listings",
  authMiddleware,
  authorize("seller", "user"),
  ProductController.getMyProducts,
);

////////////////////////////////////////////////////////////////////
//// SELLER ROUTES — requires active subscription
////////////////////////////////////////////////////////////////////

/**
 * @route   POST /api/products/seller/create
 * @desc    Seller creates a new listing (new / refurbished / old)
 * @access  Private (Seller only)
 */
router.post(
  "/seller/create",
  authMiddleware,
  authorize("seller"),
  blockAdmin,
  checkAccountStatus,
  productUpload, // multer FIRST — parses multipart req.body
  validateProductFiles,
  requireActiveSubscription,
  checkListingLimit,
  checkDeviceTypePermission,
  ProductController.createProduct,
);

////////////////////////////////////////////////////////////////////
//// USER ROUTES — old devices only
////////////////////////////////////////////////////////////////////

/**
 * @route   POST /api/products/user/create
 * @desc    User lists an old device
 * @access  Private (User only)
 */
router.post(
  "/user/create",
  authMiddleware,
  authorize("user"),
  blockAdmin,
  productUpload, // multer FIRST
  validateProductFiles,
  checkDeviceTypePermission, // enforces deviceType = "old"
  ProductController.createProduct,
);

////////////////////////////////////////////////////////////////////
//// UPDATE & DELETE — owner only
////////////////////////////////////////////////////////////////////

/**
 * @route   PUT /api/products/:id
 * @desc    Update own product listing
 * @access  Private (Seller, User — owner only)
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("seller", "user"),
  blockAdmin,
  productUpload,
  validateProductFiles,
  ProductController.updateProduct,
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete own product listing
 * @access  Private (Seller, User — owner only)
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("seller", "user"),
  blockAdmin,
  ProductController.deleteProduct,
);

module.exports = router;
