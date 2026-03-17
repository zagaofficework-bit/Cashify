const mongoose       = require("mongoose");
const ProductService = require("../service/product.service");
const OrderModel     = require("../models/order.model");

const COMMISSION_RATES = OrderModel.COMMISSION_RATES;

// ─── Allowed payment methods ───────────────────────────────────────────────────
const VALID_PAYMENT_METHODS = ["Cash", "UPI", "Card", "NetBanking"];

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function isValidPaymentMethod(method) {
  return VALID_PAYMENT_METHODS.includes(method);
}

// ─── HELPER: Calculate commission ─────────────────────────────────────────────
function calculateCommission(price, role) {
  const rates  = COMMISSION_RATES[role];
  const rate   = (rates.min + rates.max) / 2;
  const amount = parseFloat(((price * rate) / 100).toFixed(2));
  return { rate, amount };
}

// ─── Buyer populate fields — includes phone + address for seller order view ───
const BUYER_FIELDS  = "firstname lastname email mobile phone defaultAddress";
const SELLER_FIELDS = "firstname lastname email defaultAddress";


// ─── PLACE BUY ORDER ──────────────────────────────────────────────────────────
// POST /products/:id/buy
exports.buyProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({
        message:        "Payment method is required",
        allowedMethods: VALID_PAYMENT_METHODS,
      });
    }

    if (!isValidPaymentMethod(paymentMethod)) {
      return res.status(400).json({
        message:        `Invalid payment method "${paymentMethod}". Allowed: ${VALID_PAYMENT_METHODS.join(", ")}`,
        allowedMethods: VALID_PAYMENT_METHODS,
      });
    }

    const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "available") {
      return res.status(400).json({ message: "This product is no longer available" });
    }

    if (product.listedBy._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot buy your own product" });
    }

    const buyerRole  = req.user.role;
    const sellerRole = product.listedByRole;

    if (buyerRole === "user" && sellerRole !== "seller") {
      return res.status(403).json({
        message: "Users can only purchase products listed by sellers",
        code:    "INVALID_TRANSACTION",
      });
    }

    const { rate, amount } = calculateCommission(product.price, buyerRole);
    const sellerEarnings   = parseFloat((product.price - amount).toFixed(2));

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
      paymentMethod,
      paymentStatus:    "completed",
      paidAt:           new Date(),
      status:           "pending",
    });

    await ProductService.markAsReserved(product._id);

    res.status(201).json({
      success: true,
      message: "Payment successful. Order placed — waiting for seller to confirm.",
      data: {
        orderId:       order._id,
        status:        "pending",
        paymentStatus: "completed",
        paymentMethod,
        paidAt:        order.paidAt,
        product: {
          id:    product._id,
          title: product.title,
          price: product.price,
        },
        breakdown: {
          productPrice:     product.price,
          commissionRate:   `${rate}%`,
          commissionAmount: amount,
          totalPaid:        product.price,
          sellerReceives:   sellerEarnings,
        },
      },
    });
  } catch (error) {
    console.error("buyProduct error:", error);
    res.status(500).json({ message: "Purchase failed. Please try again" });
  }
};


// ─── CONFIRM BUY ORDER ────────────────────────────────────────────────────────
// POST /orders/:orderId/confirm
exports.confirmBuyOrder = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await OrderModel.findOne({
      _id:             req.params.orderId,
      seller:          req.user._id,
      transactionType: "buy",
      status:          "pending",
    })
      .populate("product", "title price images status")
      .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found, already processed, or you are not the seller",
      });
    }

    const confirmedOrder = await OrderModel.findByIdAndUpdate(
      order._id,
      {
        status:        "confirmed",
        paymentStatus: "completed",
        confirmedAt:   new Date(),
      },
      { new: true }
    )
      .populate("product", "title price images")
      .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
      .populate("seller",  SELLER_FIELDS)
      .lean();

    await ProductService.markAsSold(order.product._id);

    res.status(200).json({
      success: true,
      message: `Order confirmed. ${order.buyer.firstname}'s purchase is now complete.`,
      data: {
        orderId:       confirmedOrder._id,
        status:        "confirmed",
        confirmedAt:   confirmedOrder.confirmedAt,
        buyer: {
          name:  `${order.buyer.firstname} ${order.buyer.lastname}`,
          email: order.buyer.email,
        },
        product: {
          title: order.product.title,
          price: order.product.price,
        },
        earnings: confirmedOrder.sellerEarnings,
      },
    });
  } catch (error) {
    console.error("confirmBuyOrder error:", error);
    res.status(500).json({ message: "Failed to confirm order" });
  }
};


// ─── REJECT BUY ORDER ─────────────────────────────────────────────────────────
// POST /orders/:orderId/reject
exports.rejectBuyOrder = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const { reason } = req.body;

    const order = await OrderModel.findOne({
      _id:             req.params.orderId,
      seller:          req.user._id,
      transactionType: "buy",
      status:          "pending",
    })
      .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
      .populate("product", "title")
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found, already processed, or you are not the seller",
      });
    }

    await OrderModel.findByIdAndUpdate(order._id, {
      status:          "rejected",
      rejectedAt:      new Date(),
      rejectionReason: reason?.trim() || null,
    });

    await ProductService.markAsAvailable(order.product._id);

    res.status(200).json({
      success: true,
      message: "Order request rejected. Product is available again.",
      data: {
        orderId:    order._id,
        status:     "rejected",
        rejectedAt: new Date(),
        reason:     reason?.trim() || null,
      },
    });
  } catch (error) {
    console.error("rejectBuyOrder error:", error);
    res.status(500).json({ message: "Failed to reject order" });
  }
};


// ─── CANCEL BUY ORDER ─────────────────────────────────────────────────────────
// POST /orders/:orderId/cancel
exports.cancelBuyOrder = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await OrderModel.findOne({
      _id:             req.params.orderId,
      buyer:           req.user._id,
      transactionType: "buy",
      status:          "pending",
    })
      .populate("product", "title _id")
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found or cannot be cancelled (already confirmed or rejected)",
      });
    }

    await OrderModel.findByIdAndUpdate(order._id, {
      status:      "cancelled",
      cancelledAt: new Date(),
    });

    await ProductService.markAsAvailable(order.product._id);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully. Product is available again.",
      data: {
        orderId:     order._id,
        status:      "cancelled",
        cancelledAt: new Date(),
      },
    });
  } catch (error) {
    console.error("cancelBuyOrder error:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};


// ─── GET MY ORDERS ────────────────────────────────────────────────────────────
// GET /orders/my?type=buy&status=pending&page=1&limit=10
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
        .populate("product", "title images price brand")
        .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
        .populate("seller",  SELLER_FIELDS)
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


// ─── GET PENDING ORDERS FOR SELLER ────────────────────────────────────────────
// GET /orders/pending
exports.getSellerPendingOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      seller:          req.user._id,
      transactionType: "buy",
      status:          "pending",
    })
      .sort({ createdAt: -1 })
      .populate("product", "title images price condition brand")
      .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
      .lean();

    res.status(200).json({
      success: true,
      count:   orders.length,
      orders,
    });
  } catch (error) {
    console.error("getSellerPendingOrders error:", error);
    res.status(500).json({ message: "Failed to fetch pending orders" });
  }
};


// ─── UPDATE ORDER STATUS ──────────────────────────────────────────────────────
// PATCH /orders/:orderId/status
exports.updateOrderStatus = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled", "delivered", "rejected", "shipped"];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        allowedStatuses,
      });
    }

    const order = await OrderModel.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isBuyer  = order.buyer.toString()  === req.user._id.toString();
    const isSeller = order.seller.toString() === req.user._id.toString();

    if (!isBuyer && !isSeller) {
      return res.status(403).json({ message: "You are not allowed to update this order" });
    }

    if (order.status === "completed" || order.status === "cancelled") {
      return res.status(400).json({ message: "Finalized orders cannot be updated" });
    }

    order.status = status;
    await order.save();

    const updatedOrder = await OrderModel.findById(order._id)
      .populate("product", "title price brand images")
      .populate("buyer",   BUYER_FIELDS)   // ← full buyer fields
      .populate("seller",  SELLER_FIELDS)
      .lean();

    res.status(200).json({
      success: true,
      message: `Order status updated to "${status}"`,
      data:    updatedOrder,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};