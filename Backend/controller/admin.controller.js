const mongoose = require("mongoose");
const ProductService = require("../service/product.service");
const OrderModel = require("../models/order.model");
const UserModel = require("../models/user.model");
const SubscriptionModel = require("../models/subscription.model");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// ─── DELETE ANY PRODUCT LISTING ───────────────────────────────────────────────

exports.adminDeleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.deleteProduct(
      req.params.id,
      req.user._id,
      "admin",
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

// ─── GET ALL ORDERS + COMMISSION SUMMARY ──────────────────────────────────────

exports.getAllOrders = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (type) filter.transactionType = type;
    if (status) filter.status = status;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total, commissionData] = await Promise.all([
      OrderModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("product", "title price")
        .populate("buyer", "firstname lastname role")
        .populate("seller", "firstname lastname role")
        .lean(),
      OrderModel.countDocuments(filter),
      OrderModel.aggregate([
        { $match: { paymentStatus: "completed" } },
        {
          $group: {
            _id: null,
            totalCommission: { $sum: "$commissionAmount" },
            totalOrders: { $sum: 1 },
            totalSaleValue: { $sum: "$salePrice" },
          },
        },
      ]),
    ]);

    const commission = commissionData[0] || {
      totalCommission: 0,
      totalOrders: 0,
      totalSaleValue: 0,
    };

    res.status(200).json({
      success: true,
      orders,
      commissionSummary: {
        totalCommissionEarned: commission.totalCommission,
        totalCompletedOrders: commission.totalOrders,
        totalPlatformSales: commission.totalSaleValue,
      },
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ─── PAUSE SELLER SUBSCRIPTION ────────────────────────────────────────────────
// Admin can temporarily pause a seller's subscription due to suspicious activity.
// Paused sellers cannot list new products or make transactions.
// POST /admin/sellers/:sellerId/pause
// body: { reason }

exports.pauseSellerSubscription = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { reason } = req.body;

    if (!isValidObjectId(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    if (!reason || reason.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "A reason is required to pause a subscription" });
    }

    // Verify the user is a seller
    const seller = await UserModel.findById(sellerId)
      .select("role firstname lastname email")
      .lean();

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (seller.role !== "seller") {
      return res.status(400).json({ message: "This user is not a seller" });
    }

    // Find their active subscription
    const subscription = await SubscriptionModel.findOne({
      seller: sellerId,
      isActive: true,
      endDate: { $gte: new Date() },
    });

    if (!subscription) {
      return res
        .status(404)
        .json({ message: "No active subscription found for this seller" });
    }

    // Pause the subscription
    subscription.status = "paused";
    subscription.pausedAt = new Date();
    subscription.pausedBy = req.user._id;
    subscription.pauseReason = reason.trim();
    await subscription.save();

    // Also mark seller account as suspended
    await UserModel.findByIdAndUpdate(sellerId, {
      accountStatus: "suspended",
      suspendedAt: new Date(),
      suspendedBy: req.user._id,
      suspensionReason: reason.trim(),
    });

    res.status(200).json({
      success: true,
      message: `Subscription paused for seller ${seller.firstname} ${seller.lastname}`,
      data: {
        sellerId,
        sellerName: `${seller.firstname} ${seller.lastname}`,
        email: seller.email,
        subscriptionId: subscription._id,
        status: "paused",
        pausedAt: subscription.pausedAt,
        reason: reason.trim(),
      },
    });
  } catch (error) {
    console.error("pauseSellerSubscription error:", error);
    res.status(500).json({ message: "Failed to pause subscription" });
  }
};

// ─── BAN SELLER SUBSCRIPTION ──────────────────────────────────────────────────
// Admin permanently bans a seller for fraud or severe violations.
// Banned sellers lose access and all active listings are hidden.
// POST /admin/sellers/:sellerId/ban
// body: { reason }

exports.banSellerSubscription = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { reason } = req.body;

    if (!isValidObjectId(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    if (!reason || reason.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "A reason is required to ban a seller" });
    }

    const seller = await UserModel.findById(sellerId)
      .select("role firstname lastname email")
      .lean();

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (seller.role !== "seller") {
      return res.status(400).json({ message: "This user is not a seller" });
    }

    // Cancel all subscriptions (active or paused)
    const subscriptionResult = await SubscriptionModel.updateMany(
      { seller: sellerId, isActive: true },
      {
        $set: {
          status: "banned",
          bannedAt: new Date(),
          bannedBy: req.user._id,
          banReason: reason.trim(),
        },
      },
    );

    // Ban the seller account permanently
    await UserModel.findByIdAndUpdate(sellerId, {
      accountStatus: "banned",
      bannedAt: new Date(),
      bannedBy: req.user._id,
      banReason: reason.trim(),
    });

    // Hide all their active product listings
    const { modifiedCount: hiddenProducts } =
      await ProductService.hideAllProductsBySeller(sellerId);

    res.status(200).json({
      success: true,
      message: `Seller ${seller.firstname} ${seller.lastname} has been permanently banned`,
      data: {
        sellerId,
        sellerName: `${seller.firstname} ${seller.lastname}`,
        email: seller.email,
        subscriptionsCancelled: subscriptionResult.modifiedCount,
        productsHidden: hiddenProducts,
        bannedAt: new Date(),
        reason: reason.trim(),
      },
    });
  } catch (error) {
    console.error("banSellerSubscription error:", error);
    res.status(500).json({ message: "Failed to ban seller" });
  }
};

// ─── REINSTATE SELLER ─────────────────────────────────────────────────────────
// Admin can reinstate a paused seller (not banned).
// POST /admin/sellers/:sellerId/reinstate
// body: { note } (optional)

exports.reinstateSellerSubscription = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { note } = req.body;

    if (!isValidObjectId(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const seller = await UserModel.findById(sellerId)
      .select("role firstname lastname email accountStatus")
      .lean();

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (seller.accountStatus === "banned") {
      return res
        .status(403)
        .json({
          message:
            "Banned sellers cannot be reinstated. Create a new account if required.",
        });
    }

    if (seller.accountStatus !== "suspended") {
      return res
        .status(400)
        .json({ message: "Seller is not currently suspended" });
    }

    // Reactivate paused subscription
    const subscription = await SubscriptionModel.findOneAndUpdate(
      { seller: sellerId, isActive: false },
      {
        $set: {
          status: "active",
          reinstatedAt: new Date(),
          reinstatedBy: req.user._id,
          reinstatementNote: note?.trim() || null,
        },
        $unset: {
          pausedAt: "",
          pausedBy: "",
          pauseReason: "",
        },
      },
      { new: true },
    );

    if (!subscription) {
      return res
        .status(404)
        .json({ message: "No paused subscription found to reinstate" });
    }

    // Restore seller account status
    await UserModel.findByIdAndUpdate(sellerId, {
      accountStatus: "active",
      $unset: {
        suspendedAt: "",
        suspendedBy: "",
        suspensionReason: "",
      },
    });

    res.status(200).json({
      success: true,
      message: `Seller ${seller.firstname} ${seller.lastname} has been reinstated`,
      data: {
        sellerId,
        sellerName: `${seller.firstname} ${seller.lastname}`,
        subscriptionId: subscription._id,
        status: "active",
        reinstatedAt: new Date(),
        note: note?.trim() || null,
      },
    });
  } catch (error) {
    console.error("reinstateSellerSubscription error:", error);
    res.status(500).json({ message: "Failed to reinstate seller" });
  }
};

// ─── GET ALL SUBSCRIBED SELLERS ───────────────────────────────────────────────
// Returns list of all sellers with their active subscription plan,
// start/end dates, and total products listed.
// GET /admin/subscriptions
// query: { status, plan, page, limit }

exports.getSubscribedSellers = async (req, res) => {
  try {
    const {
      // Filter by subscription status: "active" | "expired" | "revoked"
      subscriptionStatus,
      // Filter by user account status: "active" | "suspended" | "banned"
      accountStatus,
      plan,
      page = 1,
      limit = 20,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // ─── Subscription filter ───────────────────────────────────────
    const subFilter = {};

    if (subscriptionStatus === "active") {
      subFilter.isActive = true;
      subFilter.endDate = { $gte: new Date() }; // not expired
    } else if (subscriptionStatus === "expired") {
      subFilter.isActive = true;
      subFilter.endDate = { $lt: new Date() }; // past end date
    } else if (subscriptionStatus === "revoked") {
      subFilter.isActive = false; // admin revoked
    }
    // No subscriptionStatus param = return all

    if (plan) subFilter.plan = plan;

    // ─── User accountStatus filter (applied via populate match) ────
    const populateMatch = {};
    if (accountStatus) populateMatch.accountStatus = accountStatus;

    const [subscriptions, total] = await Promise.all([
      SubscriptionModel.find(subFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate({
          path: "seller",
          select:
            "firstname lastname email mobile profilePic accountStatus suspendedAt suspensionReason bannedAt banReason createdAt role",
          match: populateMatch, // filter by accountStatus if provided
        })
        .lean({ virtuals: true }),
      SubscriptionModel.countDocuments(subFilter),
    ]);

    // When populate match filters out a seller, it sets seller to null
    // So filter those out
    const filtered = subscriptions.filter((s) => s.seller !== null);

    // ─── Product count per seller ──────────────────────────────────
    const sellerIds = filtered.map((s) => s.seller._id);
    const productCounts =
      await ProductService.countProductsBySellers(sellerIds);

    const productCountMap = {};
    productCounts.forEach(({ _id, count }) => {
      productCountMap[_id.toString()] = count;
    });

    // ─── Build response ────────────────────────────────────────────
    const sellers = filtered.map((sub) => ({
      subscriptionId: sub._id,

      // ── User account info + their account status ─────────────────
      seller: {
        id: sub.seller._id,
        name: `${sub.seller.firstname} ${sub.seller.lastname ?? ""}`.trim(),
        email: sub.seller.email,
        mobile: sub.seller.mobile,
        profilePic: sub.seller.profilePic,
        role: sub.seller.role,
        joinedAt: sub.seller.createdAt,

        // accountStatus — set/changed by admin only
        accountStatus: sub.seller.accountStatus, // "active" | "suspended" | "banned"

        // Show suspension/ban details if applicable
        ...(sub.seller.accountStatus === "suspended" && {
          suspendedAt: sub.seller.suspendedAt,
          suspensionReason: sub.seller.suspensionReason,
        }),
        ...(sub.seller.accountStatus === "banned" && {
          bannedAt: sub.seller.bannedAt,
          banReason: sub.seller.banReason,
        }),
      },

      // ── Subscription info + its own active/expired/revoked status ─
      subscription: {
        plan: sub.plan,
        price: sub.price,
        isActive: sub.isActive,
        subscriptionStatus: sub.subscriptionStatus, // virtual: "active|expired|revoked"
        daysRemaining: sub.daysRemaining, // virtual: 0 if expired/revoked
        startDate: sub.startDate,
        endDate: sub.endDate,
        paymentMethod: sub.paymentMethod,
        activeListingsLimit: sub.activeListingsLimit,
        prioritySupport: sub.prioritySupport,
        supportType: sub.supportType,
      },

      productsListed: productCountMap[sub.seller._id.toString()] || 0,
    }));

    res.status(200).json({
      success: true,
      sellers,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getSubscribedSellers error:", error);
    res.status(500).json({ message: "Failed to fetch subscribed sellers" });
  }
};

// ─── GET SINGLE SELLER SUBSCRIPTION DETAIL ────────────────────────────────────
// Full detail of a single seller: subscription info + all their products
// GET /admin/subscriptions/:sellerId

exports.getSellerSubscriptionDetail = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!isValidObjectId(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const [seller, subscription, products] = await Promise.all([
      UserModel.findById(sellerId)
        .select(
          "firstname lastname email phone accountStatus createdAt suspensionReason banReason",
        )
        .lean(),

      SubscriptionModel.findOne({ seller: sellerId })
        .sort({ createdAt: -1 })
        .lean(),

      ProductService.getProductsBySeller(sellerId),
    ]);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        seller: {
          id: seller._id,
          name: `${seller.firstname} ${seller.lastname}`.trim(),
          email: seller.email,
          phone: seller.phone,
          accountStatus: seller.accountStatus || "active",
          joinedAt: seller.createdAt,
          ...(seller.suspensionReason && {
            suspensionReason: seller.suspensionReason,
          }),
          ...(seller.banReason && { banReason: seller.banReason }),
        },
        subscription: subscription
          ? {
              id: subscription._id,
              plan: subscription.planName,
              status: subscription.status,
              startDate: subscription.startDate,
              endDate: subscription.endDate,
              amount: subscription.amount,
              autoRenew: subscription.autoRenew ?? false,
              ...(subscription.pausedAt && {
                pausedAt: subscription.pausedAt,
                pauseReason: subscription.pauseReason,
              }),
              ...(subscription.bannedAt && {
                bannedAt: subscription.bannedAt,
                banReason: subscription.banReason,
              }),
            }
          : null,
        productsListed: products.length,
        products,
      },
    });
  } catch (error) {
    console.error("getSellerSubscriptionDetail error:", error);
    res.status(500).json({ message: "Failed to fetch seller details" });
  }
};
