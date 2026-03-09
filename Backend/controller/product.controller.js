const mongoose           = require("mongoose");
const ProductService     = require("../service/product.service");
const OrderModel         = require("../models/order.model");
const uploadToCloudinary = require("../helper/cloudinaryUpload");

const COMMISSION_RATES = OrderModel.COMMISSION_RATES;

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

////////////////////////////////////////////////////////////////////
//// HELPER — Calculate commission based on buyer role
//// seller: avg 1.25%, user: avg 2.25%
////////////////////////////////////////////////////////////////////

function calculateCommission(price, role) {
  const rates  = COMMISSION_RATES[role];
  const rate   = (rates.min + rates.max) / 2;
  const amount = parseFloat(((price * rate) / 100).toFixed(2));
  return { rate, amount };
}

////////////////////////////////////////////////////////////////////
//// CREATE PRODUCT
//// seller → new, refurbished, old
//// user   → old only
//// admin  → ❌ blocked (use blockAdmin middleware on route)
////////////////////////////////////////////////////////////////////

exports.createProduct = async (req, res) => {
  try {
    // 1. Upload images in parallel
    let imageUrls = [];
    if (req.files?.images?.length > 0) {
      const results = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.buffer, { resourceType: "image" })
        )
      );
      imageUrls = results.map((r) => r.secure_url);
    }

    // 2. Upload video if provided
    let videoUrl = null;
    if (req.files?.video?.length > 0) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        { resourceType: "video" }
      );
      videoUrl = result.secure_url;
    }

    // 3. Use lister's saved location if coordinates not provided
    const coordinates =
      req.body.longitude && req.body.latitude
        ? [Number(req.body.longitude), Number(req.body.latitude)]
        : req.user.location?.coordinates || [0, 0];

    // 4. Build product data
    const productData = {
      title:         req.body.title,
      description:   req.body.description,
      category:      req.body.category,
      subcategory:   req.body.subcategory,
      brand:         req.body.brand,
      deviceType:    req.body.deviceType,
      condition:     req.body.condition,
      storage:       req.body.storage,
      color:         req.body.color,
      price:         Number(req.body.price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : null,
      payment:       req.body.payment,
      images:        imageUrls,
      video:         videoUrl,
      listedBy:      req.user._id,
      listedByRole:  req.user.role,
      location: {
        type:        "Point",
        coordinates,
      },
      address: {
        city:    req.body.city    || req.user.address?.city,
        state:   req.body.state   || req.user.address?.state,
        pincode: req.body.pincode || req.user.address?.pincode,
        full:    req.body.address || req.user.address?.full,
      },
      status: "available",
    };

    const product = await ProductService.createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      data:    product,
    });
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Failed to create product. Please try again" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET ALL PRODUCTS — public
////////////////////////////////////////////////////////////////////

exports.getProducts = async (req, res) => {
  try {
    const result = await ProductService.getProducts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("getProducts error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET MY LISTINGS — seller/user only
////////////////////////////////////////////////////////////////////

exports.getMyProducts = async (req, res) => {
  try {
    const result = await ProductService.getMyProducts(req.user._id, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("getMyProducts error:", error);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET PRODUCT BY ID — public
////////////////////////////////////////////////////////////////////

exports.getProductById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("getProductById error:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

////////////////////////////////////////////////////////////////////
//// BUY PRODUCT — seller/user only (admin blocked via middleware)
//// user   → can only buy from seller
//// seller → can buy from seller or user
////////////////////////////////////////////////////////////////////

exports.buyProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "available") {
      return res.status(400).json({ message: "This product is no longer available" });
    }

    // Cannot buy your own product
    if (product.listedBy._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot buy your own product" });
    }

    const buyerRole  = req.user.role;
    const sellerRole = product.listedByRole;

    // ✅ User can ONLY buy from seller
    if (buyerRole === "user" && sellerRole !== "seller") {
      return res.status(403).json({
        message: "Users can only purchase products listed by sellers",
        code:    "INVALID_TRANSACTION",
      });
    }

    // Calculate commission based on buyer's role
    const { rate, amount } = calculateCommission(product.price, buyerRole);
    const sellerEarnings   = parseFloat((product.price - amount).toFixed(2));

    // Create order
    const order = await OrderModel.create({
      buyer:            req.user._id,
      buyerRole,
      seller:           product.listedBy._id,
      sellerRole,
      product:          product._id,
      transactionType:  "buy",
      salePrice:        product.price,
      commissionRate:   rate,
      commissionAmount: amount,
      sellerEarnings,
      paymentMethod:    req.body.paymentMethod || null,
      status:           "confirmed",
      paymentStatus:    "completed",
    });

    // Mark product as sold
    await ProductService.markAsSold(product._id);

    res.status(201).json({
      success: true,
      message: "Purchase successful",
      data: {
        order,
        breakdown: {
          productPrice:    product.price,
          commissionRate:  `${rate}%`,
          commissionAmount: amount,
          totalPaid:       product.price,
          sellerReceives:  sellerEarnings,
          adminCommission: amount,
        },
      },
    });
  } catch (error) {
    console.error("buyProduct error:", error);
    res.status(500).json({ message: "Purchase failed. Please try again" });
  }
};

////////////////////////////////////////////////////////////////////
//// SELL DEVICE TO SELLER — user only
//// User submits device details to a specific seller
////////////////////////////////////////////////////////////////////

exports.sellDeviceToSeller = async (req, res) => {
  try {
    const { sellerId, deviceDetails, expectedPrice, paymentMethod } = req.body;

    if (!isValidObjectId(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    if (!expectedPrice || expectedPrice <= 0) {
      return res.status(400).json({ message: "Valid expected price is required" });
    }

    // Verify target is a seller
    const userModel  = require("../models/user.model");
    const targetUser = await userModel
      .findById(sellerId)
      .select("role firstname lastname")
      .lean();

    if (!targetUser || targetUser.role !== "seller") {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Commission: user pays 2–2.5%
    const { rate, amount } = calculateCommission(expectedPrice, "user");
    const sellerEarnings   = parseFloat((expectedPrice - amount).toFixed(2));

    const order = await OrderModel.create({
      buyer:            sellerId,       // seller is purchasing the device
      buyerRole:        "seller",
      seller:           req.user._id,   // user is the one selling
      sellerRole:       "user",
      transactionType:  "sell",
      salePrice:        expectedPrice,
      commissionRate:   rate,
      commissionAmount: amount,
      sellerEarnings,
      paymentMethod:    paymentMethod || null,
      status:           "pending",      // seller must confirm
      paymentStatus:    "pending",
      sellerNote:       deviceDetails  || null,
    });

    res.status(201).json({
      success: true,
      message: `Sell request sent to ${targetUser.firstname}. They will review and confirm`,
      data: {
        order,
        breakdown: {
          expectedPrice,
          commissionRate:   `${rate}%`,
          commissionAmount: amount,
          youWillReceive:   sellerEarnings,
          adminCommission:  amount,
        },
      },
    });
  } catch (error) {
    console.error("sellDeviceToSeller error:", error);
    res.status(500).json({ message: "Failed to submit sell request" });
  }
};

////////////////////////////////////////////////////////////////////
//// CONFIRM SELL REQUEST — seller confirms user's sell request
////////////////////////////////////////////////////////////////////

exports.confirmSellRequest = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await OrderModel.findOneAndUpdate(
      {
        _id:             req.params.orderId,
        buyer:           req.user._id,
        transactionType: "sell",
        status:          "pending",
      },
      { status: "completed", paymentStatus: "completed" },
      { new: true }
    )
      .populate("seller", "firstname lastname email")
      .populate("buyer",  "firstname lastname email")
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Sell request not found or already processed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sell request confirmed successfully",
      data:    order,
    });
  } catch (error) {
    console.error("confirmSellRequest error:", error);
    res.status(500).json({ message: "Failed to confirm sell request" });
  }
};

////////////////////////////////////////////////////////////////////
//// GET MY ORDERS — seller/user
////////////////////////////////////////////////////////////////////

exports.getMyOrders = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;

    const filter = {
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    };
    if (type)   filter.transactionType = type;
    if (status) filter.status          = status;

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      OrderModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("product", "title images price")
        .populate("buyer",   "firstname lastname role")
        .populate("seller",  "firstname lastname role")
        .lean(),
      OrderModel.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        page:       pageNum,
        limit:      limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext:    pageNum < Math.ceil(total / limitNum),
        hasPrev:    pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getMyOrders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

////////////////////////////////////////////////////////////////////
//// ADMIN — GET ALL ORDERS + COMMISSION SUMMARY
////////////////////////////////////////////////////////////////////

exports.getAllOrders = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (type)   filter.transactionType = type;
    if (status) filter.status          = status;

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    // Get orders + total commission earned in parallel
    const [orders, total, commissionData] = await Promise.all([
      OrderModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("product", "title price")
        .populate("buyer",   "firstname lastname role")
        .populate("seller",  "firstname lastname role")
        .lean(),
      OrderModel.countDocuments(filter),
      // Aggregate total commission earned by admin
      OrderModel.aggregate([
        { $match: { paymentStatus: "completed" } },
        {
          $group: {
            _id:              null,
            totalCommission:  { $sum: "$commissionAmount" },
            totalOrders:      { $sum: 1 },
            totalSaleValue:   { $sum: "$salePrice" },
          },
        },
      ]),
    ]);

    const commission = commissionData[0] || {
      totalCommission: 0,
      totalOrders:     0,
      totalSaleValue:  0,
    };

    res.status(200).json({
      success: true,
      orders,
      commissionSummary: {
        totalCommissionEarned: commission.totalCommission,
        totalCompletedOrders:  commission.totalOrders,
        totalPlatformSales:    commission.totalSaleValue,
      },
      pagination: {
        total,
        page:       pageNum,
        limit:      limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext:    pageNum < Math.ceil(total / limitNum),
        hasPrev:    pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

////////////////////////////////////////////////////////////////////
//// ADMIN — DELETE ANY PRODUCT LISTING
////////////////////////////////////////////////////////////////////

exports.adminDeleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.deleteProduct(
      req.params.id,
      req.user._id,
      "admin"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product listing removed by admin",
    });
  } catch (error) {
    console.error("adminDeleteProduct error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

////////////////////////////////////////////////////////////////////
//// UPDATE PRODUCT — owner only (seller/user)
////////////////////////////////////////////////////////////////////

exports.updateProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (req.files?.images?.length > 0) {
      const results = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.buffer, { resourceType: "image" })
        )
      );
      req.body.images = results.map((r) => r.secure_url);
    }

    if (req.files?.video?.length > 0) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        { resourceType: "video" }
      );
      req.body.video = result.secure_url;
    }

    if (req.body.price)         req.body.price         = Number(req.body.price);
    if (req.body.originalPrice) req.body.originalPrice = Number(req.body.originalPrice);

    const product = await ProductService.updateProduct(
      req.params.id,
      req.user._id,
      req.body
    );

    if (!product) {
      return res.status(403).json({
        message: "Product not found or you are not authorized to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data:    product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

////////////////////////////////////////////////////////////////////
//// DELETE PRODUCT — owner only (seller/user)
////////////////////////////////////////////////////////////////////

exports.deleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.deleteProduct(
      req.params.id,
      req.user._id,
      req.user.role
    );

    if (!product) {
      return res.status(403).json({
        message: "Product not found or you are not authorized to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};