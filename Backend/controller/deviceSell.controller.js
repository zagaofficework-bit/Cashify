const mongoose = require("mongoose");
const DeviceCatalog = require("../models/deviceCatalog.model");
const DeviceListing = require("../models/deviceListing.model");
const EvaluationConfig = require("../models/evaluationConfig.model");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

////////////////////////////////////////////////////////////////////
//// STEP 1 — GET BRANDS
//// GET /api/device-sell/brands
////////////////////////////////////////////////////////////////////

exports.getBrands = async (req, res) => {
  try {
    const { category } = req.query;

    // ✅ category is required
    if (!category) {
      return res.status(400).json({
        message: "category is required",
        allowed: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      });
    }

    const brands = await DeviceCatalog.find({ category })
      .select("brand")
      .lean();

    if (brands.length === 0) {
      return res
        .status(404)
        .json({ message: `No brands found for category: ${category}` });
    }

    res.status(200).json({
      success: true,
      category,
      data: brands.map((b) => b.brand),
    });
  } catch (error) {
    console.error("getBrands error:", error);
    res.status(500).json({ message: "Failed to fetch brands" });
  }
};

////////////////////////////////////////////////////////////////////
//// STEP 2 — GET MODELS BY BRAND
//// GET /api/device-sell/brands/:brand/models
////////////////////////////////////////////////////////////////////

exports.getModelsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        message: "category is required",
        allowed: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      });
    }

    const catalog = await DeviceCatalog.findOne({ brand, category })
      .select("brand models.name models.image models.soldCount models._id")
      .lean();

    if (!catalog) {
      return res
        .status(404)
        .json({
          message: `Brand "${brand}" not found in category "${category}"`,
        });
    }

    res.status(200).json({
      success: true,
      brand: catalog.brand,
      category,
      data: catalog.models.map((m) => ({
        id: m._id,
        name: m.name,
        image: m.image,
        soldCount: m.soldCount,
      })),
    });
  } catch (error) {
    console.error("getModelsByBrand error:", error);
    res.status(500).json({ message: "Failed to fetch models" });
  }
};

////////////////////////////////////////////////////////////////////
//// STEP 3 — GET VARIANTS BY MODEL
//// GET /api/device-sell/models/:modelId/variants
////////////////////////////////////////////////////////////////////

exports.getVariantsByModel = async (req, res) => {
  try {
    const { modelId } = req.params;

    const catalog = await DeviceCatalog.findOne({
      "models._id": modelId,
    }).lean();

    if (!catalog) {
      return res.status(404).json({ message: "Model not found" });
    }

    const model = catalog.models.find((m) => m._id.toString() === modelId);

    res.status(200).json({
      success: true,
      model: model.name,
      image: model.image,
      data: model.variants.map((v) => ({
        id: v._id,
        ram: v.ram,
        storage: v.storage,
        label: v.ram ? `${v.ram}/${v.storage}` : v.storage,
        basePrice: v.basePrice,
      })),
    });
  } catch (error) {
    console.error("getVariantsByModel error:", error);
    res.status(500).json({ message: "Failed to fetch variants" });
  }
};

////////////////////////////////////////////////////////////////////
//// STEP 4 — GET EVALUATION CONFIG
//// GET /api/device-sell/evaluation-config
//// Returns questions, defects, accessories with deduction %
////////////////////////////////////////////////////////////////////

exports.getEvaluationConfig = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        message: "category is required",
        allowed: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      });
    }

    const config = await EvaluationConfig.findOne({ category }).lean();

    if (!config) {
      return res.status(404).json({
        message: `Evaluation config not found for category: ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      category,
      data: {
        questions: config.questions.sort((a, b) => a.order - b.order),
        defects: config.defects.sort((a, b) => a.order - b.order),
        accessories: config.accessories.sort((a, b) => a.order - b.order),
        processingFee: config.processingFee,
      },
    });
  } catch (error) {
    console.error("getEvaluationConfig error:", error);
    res.status(500).json({ message: "Failed to fetch evaluation config" });
  }
};

////////////////////////////////////////////////////////////////////
//// STEP 5 — CALCULATE PRICE (preview before submit)
//// POST /api/device-sell/calculate
////////////////////////////////////////////////////////////////////

exports.calculatePrice = async (req, res) => {
  try {
    const {
      variantId,
      modelId,
      category, // ✅ now required
      answers,
      defectKeys,
      accessoryKeys,
    } = req.body;

    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }

    const catalog = await DeviceCatalog.findOne({
      "models._id": modelId,
    }).lean();

    if (!catalog) {
      return res.status(404).json({ message: "Model not found" });
    }

    const model = catalog.models.find((m) => m._id.toString() === modelId);
    const variant = model?.variants.find((v) => v._id.toString() === variantId);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // ✅ Fetch config by category
    const config = await EvaluationConfig.findOne({ category }).lean();
    if (!config) {
      return res.status(500).json({
        message: `Evaluation config not found for category: ${category}`,
      });
    }

    let totalDeductionPercent = 0;
    const deductionBreakdown = [];

    if (answers) {
      for (const q of config.questions) {
        const answer = answers[q.key];
        if (answer === false && q.deductionOnNo > 0) {
          totalDeductionPercent += q.deductionOnNo;
          deductionBreakdown.push({
            reason: q.label,
            deduction: q.deductionOnNo,
          });
        }
      }
    }

    if (defectKeys?.length > 0) {
      for (const key of defectKeys) {
        const defect = config.defects.find((d) => d.key === key);
        if (defect) {
          totalDeductionPercent += defect.deduction;
          deductionBreakdown.push({
            reason: defect.label,
            deduction: defect.deduction,
          });
        }
      }
    }

    let totalAdditionPercent = 0;
    const additionBreakdown = [];

    if (accessoryKeys?.length > 0) {
      for (const key of accessoryKeys) {
        const accessory = config.accessories.find((a) => a.key === key);
        if (accessory && accessory.addition > 0) {
          totalAdditionPercent += accessory.addition;
          additionBreakdown.push({
            reason: accessory.label,
            addition: accessory.addition,
          });
        }
      }
    }

    const basePrice = variant.basePrice;
    const deductionAmount = parseFloat(
      ((basePrice * totalDeductionPercent) / 100).toFixed(2),
    );
    const additionAmount = parseFloat(
      ((basePrice * totalAdditionPercent) / 100).toFixed(2),
    );
    const afterDeductions = basePrice - deductionAmount + additionAmount;
    const processingFee = config.processingFee;
    const finalPrice = Math.max(0, Math.round(afterDeductions - processingFee));

    res.status(200).json({
      success: true,
      data: {
        device: {
          model: model.name,
          variant: variant.ram
            ? `${variant.ram}/${variant.storage}`
            : variant.storage,
          image: model.image,
          category,
        },
        pricing: {
          basePrice,
          deductionPercent: totalDeductionPercent,
          deductionAmount,
          additionAmount,
          processingFee,
          finalPrice,
        },
        breakdown: {
          deductions: deductionBreakdown,
          additions: additionBreakdown,
        },
      },
    });
  } catch (error) {
    console.error("calculatePrice error:", error);
    res.status(500).json({ message: "Failed to calculate price" });
  }
};

////////////////////////////////////////////////////////////////////
//// STEP 6 — SUBMIT LISTING
//// POST /api/device-sell/submit
//// Creates the device listing after user confirms price
////////////////////////////////////////////////////////////////////

exports.submitListing = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      variantId,
      modelId,
      category, // ✅ now required
      answers,
      defectKeys,
      accessoryKeys,
    } = req.body;

    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }

    const catalog = await DeviceCatalog.findOne({
      "models._id": modelId,
    }).lean();

    if (!catalog) {
      return res.status(404).json({ message: "Model not found" });
    }

    const model = catalog.models.find((m) => m._id.toString() === modelId);
    const variant = model?.variants.find((v) => v._id.toString() === variantId);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // ✅ Fetch config by category
    const config = await EvaluationConfig.findOne({ category }).lean();
    if (!config) {
      return res.status(500).json({
        message: `Evaluation config not found for category: ${category}`,
      });
    }

    let totalDeductionPercent = 0;
    const defectsData = [];

    if (answers) {
      for (const q of config.questions) {
        if (answers[q.key] === false && q.deductionOnNo > 0) {
          totalDeductionPercent += q.deductionOnNo;
        }
      }
    }

    if (defectKeys?.length > 0) {
      for (const key of defectKeys) {
        const defect = config.defects.find((d) => d.key === key);
        if (defect) {
          totalDeductionPercent += defect.deduction;
          defectsData.push({
            key: defect.key,
            label: defect.label,
            deduction: defect.deduction,
          });
        }
      }
    }

    let totalAdditionPercent = 0;
    const hasOriginalCharger =
      accessoryKeys?.includes("original_charger") || false;
    const hasOriginalBox = accessoryKeys?.includes("original_box") || false;

    if (accessoryKeys?.length > 0) {
      for (const key of accessoryKeys) {
        const accessory = config.accessories.find((a) => a.key === key);
        if (accessory) totalAdditionPercent += accessory.addition;
      }
    }

    const basePrice = variant.basePrice;
    const deductionAmount = parseFloat(
      ((basePrice * totalDeductionPercent) / 100).toFixed(2),
    );
    const additionAmount = parseFloat(
      ((basePrice * totalAdditionPercent) / 100).toFixed(2),
    );
    const processingFee = config.processingFee;
    const finalPrice = Math.max(
      0,
      Math.round(basePrice - deductionAmount + additionAmount - processingFee),
    );

    const listing = await DeviceListing.create({
      listedBy: userId,
      brand: catalog.brand,
      category, // ✅ saved on listing
      model: model.name,
      ram: variant.ram,
      storage: variant.storage,
      image: model.image,

      evaluation: {
        canMakeCalls: answers?.can_make_calls ?? true,
        touchWorking: answers?.touch_working ?? true,
        originalScreen: answers?.original_screen ?? true,
        defects: defectsData,
        hasOriginalCharger,
        hasOriginalBox,
      },

      basePrice,
      totalDeduction: totalDeductionPercent,
      deductionAmount,
      processingFee,
      finalPrice,
      status: "available",
    });

    await DeviceCatalog.updateOne(
      { "models._id": modelId },
      { $inc: { "models.$.soldCount": 1 } },
    );

    res.status(201).json({
      success: true,
      message: "Your device has been listed. Sellers will contact you soon.",
      data: {
        listingId: listing._id,
        device: `${model.name} (${variant.ram ? `${variant.ram}/` : ""}${variant.storage})`,
        category,
        finalPrice,
        status: "available",
      },
    });
  } catch (error) {
    console.error("submitListing error:", error);
    res.status(500).json({ message: "Failed to submit listing" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET LISTINGS — for sellers to browse
//// Super seller sees super_seller_only listings
//// Regular sellers see all_sellers listings
////////////////////////////////////////////////////////////////////

exports.getListings = async (req, res) => {
  try {
    const { brand, model, category, page = 1, limit = 20 } = req.query;
    const seller = req.user;

    const filter = { status: "available" };

    if (seller.isSuperSeller) {
      // ✅ Super seller ONLY sees super_seller_only listings
      // Once rejected (visibility flips to all_sellers) — gone from their view
      filter.visibility = "super_seller_only";
    } else {
      // ✅ Regular sellers ONLY see listings super seller has passed on
      filter.visibility = "all_sellers";
    }

    if (brand)    filter.brand    = new RegExp(brand, "i");
    if (model)    filter.model    = new RegExp(model, "i");
    if (category) filter.category = category;

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    const [listings, total] = await Promise.all([
      DeviceListing.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("listedBy", "firstname lastname mobile defaultAddress")
        .lean(),
      DeviceListing.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      pool: seller.isSuperSeller ? "priority_pool" : "open_pool",
      pagination: {
        total,
        page:       pageNum,
        limit:      limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext:    pageNum < Math.ceil(total / limitNum),
        hasPrev:    pageNum > 1,
      },
      data: listings,
    });
  } catch (error) {
    console.error("getListings error:", error);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};


////////////////////////////////////////////////////////////////////
//// GET NEARBY DEVICE LISTINGS — for "Sell devices near you"
//// GET /api/device-sell/listings/nearby
////////////////////////////////////////////////////////////////////

exports.getNearbyListings = async (req, res) => {
  try {
    let {
      latitude,
      longitude,
      radius = 10,
      category,
      page = 1,
      limit = 20,
    } = req.query;

    // Use saved user location if no coords provided
    if (!latitude || !longitude) {
      if (req.user?.location?.coordinates) {
        const [savedLng, savedLat] = req.user.location.coordinates;
        if (savedLng !== 0 || savedLat !== 0) {
          latitude = savedLat;
          longitude = savedLng;
        }
      }
    }

    if (!latitude || !longitude) {
      return res.status(400).json({
        message:
          "Location required. Provide ?latitude=&longitude= or save your location first",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const radiusM = Number(radius) * 1000;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // DeviceListing doesn't have GeoJSON location
    // so we join with User collection to get their location
    const pipeline = [
      {
        // Join with users to get their location
        $lookup: {
          from: "users",
          localField: "listedBy",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        // Filter by distance using user's location
        $match: {
          status: "available",
          ...(category && { category }),
          "user.location": {
            $geoWithin: {
              $centerSphere: [[lng, lat], Number(radius) / 6378.1],
            },
          },
        },
      },
      {
        // Calculate distance manually using $addFields
        $addFields: {
          distance: {
            $let: {
              vars: {
                lat1: lat,
                lon1: lng,
                lat2: { $arrayElemAt: ["$user.location.coordinates", 1] },
                lon2: { $arrayElemAt: ["$user.location.coordinates", 0] },
              },
              in: {
                // Haversine approximation in km
                $multiply: [
                  6371,
                  {
                    $acos: {
                      $add: [
                        {
                          $multiply: [
                            { $sin: { $degreesToRadians: "$$lat1" } },
                            { $sin: { $degreesToRadians: "$$lat2" } },
                          ],
                        },
                        {
                          $multiply: [
                            { $cos: { $degreesToRadians: "$$lat1" } },
                            { $cos: { $degreesToRadians: "$$lat2" } },
                            {
                              $cos: {
                                $subtract: [
                                  { $degreesToRadians: "$$lon2" },
                                  { $degreesToRadians: "$$lon1" },
                                ],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      { $sort: { distance: 1 } },
      { $skip: skip },
      { $limit: limitNum },
      {
        $project: {
          brand: 1,
          category: 1,
          model: 1,
          storage: 1,
          ram: 1,
          image: 1,
          finalPrice: 1,
          basePrice: 1,
          status: 1,
          distance: 1,
          createdAt: 1,
          evaluation: {
            canMakeCalls: 1,
            touchWorking: 1,
            originalScreen: 1,
          },
          listedBy: {
            _id: "$user._id",
            firstname: "$user.firstname",
            defaultAddress: "$user.defaultAddress",
          },
        },
      },
    ];

    const [listings, total] = await Promise.all([
      DeviceListing.aggregate(pipeline),
      DeviceListing.countDocuments({
        status: "available",
        ...(category && { category }),
      }),
    ]);

    res.status(200).json({
      success: true,
      meta: {
        userLocation: { latitude: lat, longitude: lng },
        radiusKm: Number(radius),
      },
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
      data: listings,
    });
  } catch (error) {
    console.error("getNearbyListings error:", error);
    res.status(500).json({ message: "Failed to fetch nearby listings" });
  }
};

////////////////////////////////////////////////////////////////////
//// ACCEPT LISTING — works same for both seller types
////////////////////////////////////////////////////////////////////

exports.acceptListing = async (req, res) => {
  try {
    const { listingId }    = req.params;
    const seller           = req.user;
    const { proposedSlots = [] } = req.body;
 
    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
 
    const visibilityFilter = seller.isSuperSeller
      ? { visibility: "super_seller_only" }
      : { visibility: "all_sellers" };
 
    const listing = await DeviceListing.findOne({
      _id:    listingId,
      status: "available",
      ...visibilityFilter,
    }).populate("listedBy", "firstname lastname mobile");
 
    if (!listing) {
      return res.status(404).json({
        message: seller.isSuperSeller
          ? "Listing not found or already accepted"
          : "Listing not found, already accepted, or not yet available to regular sellers",
      });
    }
 
    if (listing.listedBy._id.toString() === seller._id.toString()) {
      return res.status(400).json({ message: "You cannot accept your own listing" });
    }
 
    // Validate slots (max 3, each needs date + timeRange)
    const cleanSlots = (proposedSlots || [])
      .slice(0, 3)
      .filter((s) => s?.date && s?.timeRange)
      .map((s) => ({ date: s.date.trim(), timeRange: s.timeRange.trim() }));
 
    listing.status     = "accepted";
    listing.acceptedBy = seller._id;
    listing.acceptedAt = new Date();
 
    // ✅ Create pickup sub-document with proposed slots
    listing.pickup = {
      status:        "awaiting_user_confirmation",
      proposedSlots: cleanSlots,
      confirmedSlot: null,
      paymentMethod: null,
      paymentDetails: null,
      confirmedAt:   null,
    };
 
    await listing.save();
 
    res.status(200).json({
      success: true,
      message: "Listing accepted. User will be notified to confirm pickup slot and payment method.",
      data: {
        listingId:      listing._id,
        device:         listing.model,
        finalPrice:     listing.finalPrice,
        acceptedAs:     seller.isSuperSeller ? "super_seller" : "seller",
        proposedSlots:  cleanSlots,
        pickupStatus:   "awaiting_user_confirmation",
        user: {
          name:   `${listing.listedBy.firstname} ${listing.listedBy.lastname}`,
          mobile: listing.listedBy.mobile,
        },
      },
    });
  } catch (error) {
    console.error("acceptListing error:", error);
    res.status(500).json({ message: "Failed to accept listing" });
  }
};


//Confrim Pickup
exports.confirmPickup = async (req, res) => {
  try {
    const { listingId }  = req.params;
    const userId         = req.user._id;
    const { slotIndex, paymentMethod, paymentDetails } = req.body;
 
    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
 
    // Validate payment method
    const VALID_PAYMENT_METHODS = ["cash", "upi", "bank_transfer"];
    if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
        allowed: VALID_PAYMENT_METHODS,
      });
    }
 
    // UPI and bank transfer require payment details
    if (["upi", "bank_transfer"].includes(paymentMethod) && !paymentDetails?.trim()) {
      return res.status(400).json({
        message: `paymentDetails is required for ${paymentMethod}`,
      });
    }
 
    // Find the listing owned by this user, currently accepted + awaiting confirmation
    const listing = await DeviceListing.findOne({
      _id:      listingId,
      listedBy: userId,
      status:   "accepted",
      "pickup.status": "awaiting_user_confirmation",
    }).populate("acceptedBy", "firstname lastname mobile");
 
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found, not in accepted state, or already confirmed",
      });
    }
 
    // Validate slot index
    const slots = listing.pickup.proposedSlots || [];
    if (slots.length === 0) {
      return res.status(400).json({
        message: "No proposed slots available. Ask the seller to add pickup slots.",
      });
    }
 
    const idx = parseInt(slotIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= slots.length) {
      return res.status(400).json({
        message: `Invalid slotIndex. Must be 0–${slots.length - 1}`,
      });
    }
 
    // ✅ Confirm the pickup
    listing.pickup.confirmedSlot   = slots[idx];
    listing.pickup.paymentMethod   = paymentMethod;
    listing.pickup.paymentDetails  = paymentMethod === "cash" ? null : paymentDetails?.trim();
    listing.pickup.status          = "scheduled";
    listing.pickup.confirmedAt     = new Date();
 
    await listing.save();
 
    res.status(200).json({
      success: true,
      message: "Pickup confirmed! The seller will arrive at the scheduled time.",
      data: {
        listingId:     listing._id,
        device:        `${listing.model}`,
        finalPrice:    listing.finalPrice,
        confirmedSlot: listing.pickup.confirmedSlot,
        paymentMethod: listing.pickup.paymentMethod,
        paymentDetails: listing.pickup.paymentDetails,
        seller: {
          name:   `${listing.acceptedBy.firstname} ${listing.acceptedBy.lastname}`,
          mobile: listing.acceptedBy.mobile,
        },
      },
    });
  } catch (error) {
    console.error("confirmPickup error:", error);
    res.status(500).json({ message: "Failed to confirm pickup" });
  }
};


//slots for pickup
exports.proposeSlots = async (req, res) => {
  try {
    const { listingId }      = req.params;
    const sellerId           = req.user._id;
    const { proposedSlots }  = req.body;
 
    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
 
    if (!Array.isArray(proposedSlots) || proposedSlots.length === 0) {
      return res.status(400).json({ message: "proposedSlots must be a non-empty array" });
    }
 
    const cleanSlots = proposedSlots
      .slice(0, 3)
      .filter((s) => s?.date && s?.timeRange)
      .map((s) => ({ date: s.date.trim(), timeRange: s.timeRange.trim() }));
 
    if (cleanSlots.length === 0) {
      return res.status(400).json({
        message: "Each slot must have date and timeRange",
      });
    }
 
    const listing = await DeviceListing.findOne({
      _id:        listingId,
      acceptedBy: sellerId,
      status:     "accepted",
    });
 
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found or you are not the accepting seller",
      });
    }
 
    // Reset pickup to awaiting confirmation with new slots
    listing.pickup.proposedSlots  = cleanSlots;
    listing.pickup.confirmedSlot  = null;
    listing.pickup.paymentMethod  = null;
    listing.pickup.paymentDetails = null;
    listing.pickup.status         = "awaiting_user_confirmation";
    listing.pickup.confirmedAt    = null;
 
    await listing.save();
 
    res.status(200).json({
      success: true,
      message: "Proposed slots updated. User will be notified to confirm.",
      data: {
        listingId:     listing._id,
        proposedSlots: cleanSlots,
        pickupStatus:  "awaiting_user_confirmation",
      },
    });
  } catch (error) {
    console.error("proposeSlots error:", error);
    res.status(500).json({ message: "Failed to update slots" });
  }
};

////////////////////////////////////////////////////////////////////
//// SELLER COMPLETES — after face-to-face inspection
//// POST /api/device-sell/listings/:listingId/complete
////////////////////////////////////////////////////////////////////

exports.completeListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const sellerId = req.user._id;

    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await DeviceListing.findOne({
      _id: listingId,
      acceptedBy: sellerId,
      status: "accepted",
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found or you are not the accepting seller",
      });
    }

    listing.status = "completed";
    listing.completedAt = new Date();
    await listing.save();

    res.status(200).json({
      success: true,
      message: "Transaction completed successfully",
      data: {
        listingId: listing._id,
        finalPrice: listing.finalPrice,
        completedAt: listing.completedAt,
      },
    });
  } catch (error) {
    console.error("completeListing error:", error);
    res.status(500).json({ message: "Failed to complete listing" });
  }
};

////////////////////////////////////////////////////////////////////
//// REJECT LISTING — only super seller can reject to open pool
//// Regular sellers use cancelListing after accepting if needed
////////////////////////////////////////////////////////////////////

exports.rejectListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const seller = req.user;
    const { reason } = req.body;

    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await DeviceListing.findOne({
      _id: listingId,
      acceptedBy: seller._id,
      status: "accepted",
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found or you are not the accepting seller",
      });
    }

    // ── Super seller rejects after face-to-face ────────────────────────────
    // → listing goes to open pool for regular sellers
    if (seller.isSuperSeller) {
      listing.status = "available";
      listing.acceptedBy = null;
      listing.acceptedAt = null;
      listing.visibility = "all_sellers"; // ✅ now open to all
      listing.superSellerRejected = true;
      listing.superSellerRejectedBy = seller._id;
      listing.superSellerRejectedAt = new Date();
      listing.rejectionReason = reason?.trim() || null;
      await listing.save();

      return res.status(200).json({
        success: true,
        message: "Listing rejected. It is now visible to all regular sellers.",
        data: {
          listingId: listing._id,
          visibility: "all_sellers",
          status: "available",
          reason: reason?.trim() || null,
        },
      });
    }

    // ── Regular seller rejects after face-to-face ──────────────────────────
    // → listing stays in open pool (visibility unchanged)
    listing.status = "available";
    listing.acceptedBy = null;
    listing.acceptedAt = null;
    listing.rejectedAt = new Date();
    listing.rejectionReason = reason?.trim() || null;
    await listing.save();

    res.status(200).json({
      success: true,
      message:
        "Listing rejected. It is back in the open pool for other sellers.",
      data: {
        listingId: listing._id,
        visibility: listing.visibility,
        status: "available",
        reason: reason?.trim() || null,
      },
    });
  } catch (error) {
    console.error("rejectListing error:", error);
    res.status(500).json({ message: "Failed to reject listing" });
  }
};

////////////////////////////////////////////////////////////////////
//// SELLER — GET THEIR OWN ACCEPTED/COMPLETED LISTINGS
//// GET /api/device-sell/my-accepted-listings
////////////////////////////////////////////////////////////////////

exports.getMyAcceptedListings = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Fetch all listings this seller has accepted or completed.
    // "rejected" is excluded because the backend resets those back to "available"
    // and clears acceptedBy, so they'd never match this seller anyway.
    const listings = await DeviceListing.find({
      acceptedBy: sellerId,
      status: { $in: ["accepted", "completed"] },
    })
      .sort({ acceptedAt: -1 })
      .populate("listedBy", "firstname lastname mobile defaultAddress")
      .lean();

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("getMyAcceptedListings error:", error);
    res.status(500).json({ message: "Failed to fetch your accepted listings" });
  }
};

////////////////////////////////////////////////////////////////////
//// USER CANCELS THEIR OWN LISTING
//// DELETE /api/device-sell/listings/:listingId
////////////////////////////////////////////////////////////////////

exports.cancelListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await DeviceListing.findOne({
      _id: listingId,
      listedBy: userId,
      status: { $in: ["available"] }, // can only cancel if not yet accepted
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found or cannot be cancelled (already accepted)",
      });
    }

    listing.status = "cancelled";
    await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing cancelled successfully",
    });
  } catch (error) {
    console.error("cancelListing error:", error);
    res.status(500).json({ message: "Failed to cancel listing" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET MY LISTINGS — user sees their own listings
//// GET /api/device-sell/my-listings
////////////////////////////////////////////////////////////////////

exports.getMyListings = async (req, res) => {
  try {
    const listings = await DeviceListing.find({ listedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate("acceptedBy", "firstname lastname mobile")
      .lean();

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("getMyListings error:", error);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};

////////////////////////////////////////////////////////////////////
//// ADMIN — MANAGE CATALOG
////////////////////////////////////////////////////////////////////

// Add brand with models
exports.addBrandCatalog = async (req, res) => {
  try {
    const { brand, category, models } = req.body;

    if (!brand || !models?.length) {
      return res.status(400).json({ message: "brand and models are required" });
    }

    const existing = await DeviceCatalog.findOne({ brand, category });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Brand already exists in catalog" });
    }

    const catalog = await DeviceCatalog.create({ brand, category, models });

    res.status(201).json({
      success: true,
      message: "Brand catalog created",
      data: catalog,
    });
  } catch (error) {
    console.error("addBrandCatalog error:", error);
    res.status(500).json({ message: "Failed to add brand catalog" });
  }
};

// Update evaluation config
exports.updateEvaluationConfig = async (req, res) => {
  try {
    const { category, questions, defects, accessories, processingFee } =
      req.body;

    if (!category) {
      return res.status(400).json({
        message: "category is required",
        allowed: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      });
    }

    const config = await EvaluationConfig.findOneAndUpdate(
      { category }, // ✅ per category
      { $set: { category, questions, defects, accessories, processingFee } },
      { new: true, upsert: true },
    );

    res.status(200).json({
      success: true,
      message: `Evaluation config updated for category: ${category}`,
      data: config,
    });
  } catch (error) {
    console.error("updateEvaluationConfig error:", error);
    res.status(500).json({ message: "Failed to update config" });
  }
};

////////////////////////////////////////////////////////////////////
//// SUPER SELLER DISMISSES LISTING — without accepting first
//// POST /api/device-sell/listings/:listingId/dismiss
//// Moves listing directly to open pool for regular sellers
////////////////////////////////////////////////////////////////////

exports.dismissListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const seller        = req.user;
    const { reason }    = req.body;

    if (!isValidObjectId(listingId)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    // Only super seller can dismiss
    if (!seller.isSuperSeller) {
      return res.status(403).json({
        message: "Only super seller can dismiss listings",
      });
    }

    const listing = await DeviceListing.findOne({
      _id:        listingId,
      status:     "available",
      visibility: "super_seller_only",  // must still be in super seller pool
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found or already processed",
      });
    }

    // ✅ Flip visibility — now gone from super seller view
    // ✅ Now visible to all regular sellers
    listing.visibility            = "all_sellers";
    listing.superSellerRejected   = true;
    listing.superSellerRejectedBy = seller._id;
    listing.superSellerRejectedAt = new Date();
    listing.rejectionReason       = reason?.trim() || null;
    await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing dismissed. It is now visible to all regular sellers.",
      data: {
        listingId:  listing._id,
        visibility: "all_sellers",
        status:     "available",
      },
    });
  } catch (error) {
    console.error("dismissListing error:", error);
    res.status(500).json({ message: "Failed to dismiss listing" });
  }
};