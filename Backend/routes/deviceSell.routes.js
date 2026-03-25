const express              = require("express");
const router               = express.Router();
const DeviceSellController = require("../controller/deviceSell.controller");
const {
  authMiddleware,
  authorize,
  blockAdmin,
} = require("../middleware/auth.middleware");

////////////////////////////////////////////////////////////////////
//// PUBLIC — CATALOG BROWSING
////////////////////////////////////////////////////////////////////

// GET /api/device-sell/brands?category=mobile
router.get("/brands",                        DeviceSellController.getBrands);

// GET /api/device-sell/brands/:brand/models?category=mobile
router.get("/brands/:brand/models",          DeviceSellController.getModelsByBrand);

// GET /api/device-sell/models/:modelId/variants
router.get("/models/:modelId/variants",      DeviceSellController.getVariantsByModel);

// GET /api/device-sell/evaluation-config
router.get("/evaluation-config",             DeviceSellController.getEvaluationConfig);

////////////////////////////////////////////////////////////////////
//// USER — SELL FLOW
////////////////////////////////////////////////////////////////////

// POST /api/device-sell/calculate — preview price before submitting
router.post(
  "/calculate",
  authMiddleware,
  authorize("user"),
  DeviceSellController.calculatePrice
);

// POST /api/device-sell/submit — submit final listing
router.post(
  "/submit",
  authMiddleware,
  authorize("user"),
  DeviceSellController.submitListing
);

// GET /api/device-sell/my-listings — user sees own listings
router.get(
  "/my-listings",
  authMiddleware,
  authorize("user"),
  DeviceSellController.getMyListings
);

router.get(
  "/my-accepted-listings",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.getMyAcceptedListings
);

/**
 * @route   GET /api/device-sell/listings/nearby
 * @desc    Get device sell listings near user
 * @access  Private (Seller)
 * @query   ?latitude=19.07&longitude=72.87&radius=10&category=mobile
 */
router.get(
  "/listings/nearby",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.getNearbyListings
);

// DELETE /api/device-sell/listings/:listingId — user cancels listing
router.delete(
  "/listings/:listingId",
  authMiddleware,
  authorize("user"),
  DeviceSellController.cancelListing
);

////////////////////////////////////////////////////////////////////
//// SELLER — BROWSE AND ACCEPT LISTINGS
////////////////////////////////////////////////////////////////////

// GET /api/device-sell/listings — sellers browse available listings
router.get(
  "/listings",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.getListings
);

// POST /api/device-sell/listings/:listingId/accept
router.post(
  "/listings/:listingId/accept",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.acceptListing
);

// POST /api/device-sell/listings/:listingId/complete — after inspection
router.post(
  "/listings/:listingId/complete",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.completeListing
);

// POST /api/device-sell/listings/:listingId/reject — after inspection
router.post(
  "/listings/:listingId/reject",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.rejectListing
);

// POST /api/device-sell/listings/:listingId/dismiss
// Super seller dismisses from browse screen — no need to accept first
router.post(
  "/listings/:listingId/dismiss",
  authMiddleware,
  authorize("seller"),
  DeviceSellController.dismissListing
);

////////////////////////////////////////////////////////////////////
//// ADMIN — MANAGE CATALOG + CONFIG
////////////////////////////////////////////////////////////////////

router.post(
  "/admin/catalog",
  authMiddleware,
  authorize("admin"),
  DeviceSellController.addBrandCatalog
);

router.put(
  "/admin/evaluation-config",
  authMiddleware,
  authorize("admin"),
  DeviceSellController.updateEvaluationConfig
);

module.exports = router;