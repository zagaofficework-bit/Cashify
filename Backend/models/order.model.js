const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////
//// COMMISSION RATES
////////////////////////////////////////////////////////////////////

const COMMISSION_RATES = {
  seller: { min: 1, max: 1.5 }, // 1–1.5%
  user:   { min: 2, max: 2.5 }, // 2–2.5%
};

////////////////////////////////////////////////////////////////////
//// SCHEMA
////////////////////////////////////////////////////////////////////

const orderSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    // ─── Buyer ────────────────────────────────────────────
=======
    ////////////////////////////////////////////////////////////////////
    //// PARTIES
    ////////////////////////////////////////////////////////////////////

>>>>>>> 22920d66eb19a7c71f402d6da516a675ec8a3947
    buyer: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
<<<<<<< HEAD
=======

    buyerRole: {
      type: String,
      enum: ["seller", "user"],
    },

    seller: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
>>>>>>> 22920d66eb19a7c71f402d6da516a675ec8a3947

    sellerRole: {
      type: String,
      enum: ["seller", "user", "admin"],
    },

    ////////////////////////////////////////////////////////////////////
    //// PRODUCT
    ////////////////////////////////////////////////////////////////////

    product: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Product",
      required: true,
    },

<<<<<<< HEAD
    // Snapshot — preserves order history if product is deleted/updated
    productSnapshot: {
      title:       String,
      price:       Number,
      condition:   String,
      storage:     String,
      color:       String,
      category:    String,
      subcategory: String,
      image:       String,
    },

    // ─── Pricing ──────────────────────────────────────────
    amount: {
      type:     Number,
=======
    ////////////////////////////////////////////////////////////////////
    //// TRANSACTION TYPE
    //// buy  → buyer purchases product from seller
    //// sell → user sells their device to a seller
    ////////////////////////////////////////////////////////////////////

    transactionType: {
      type:     String,
      enum:     ["buy", "sell"],
>>>>>>> 22920d66eb19a7c71f402d6da516a675ec8a3947
      required: true,
    },

    ////////////////////////////////////////////////////////////////////
    //// PRICING + COMMISSION
    ////////////////////////////////////////////////////////////////////

    salePrice: {
      type:     Number,
      required: true,
    },

    // Commission rate applied (1-2.5% depending on buyer role)
    commissionRate: {
      type:     Number,
      required: true,
    },

    // Actual commission amount paid to admin
    commissionAmount: {
      type:     Number,
      required: true,
    },

    // What the seller receives after commission deduction
    sellerEarnings: {
      type:     Number,
      required: true,
    },

    ////////////////////////////////////////////////////////////////////
    //// PAYMENT
    ////////////////////////////////////////////////////////////////////

    paymentMethod: {
<<<<<<< HEAD
      type:     String,
      enum:     ["COD", "Stripe"],
      required: true,
    },
    paymentStatus: {
      type:    String,
      enum:    ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    // Stripe specific — null for COD
    stripePaymentIntentId:       { type: String, default: null },
    stripePaymentIntentClientSecret: { type: String, default: null },

    // ─── Shipping Address Snapshot ────────────────────────
    shippingAddress: {
      addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
      street:    String,
      city:      String,
      state:     String,
      zipcode:   String,
      country:   String,
      phone:     String,
      email:     String,
    },

    // ─── Order Status ─────────────────────────────────────
    orderStatus: {
      type:    String,
      enum:    ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },

    // ─── Cancellation ─────────────────────────────────────
    cancelledBy: {
      type:    String,
      enum:    ["Buyer", "Admin", null],
      default: null,
    },
    cancellationReason: {
=======
      type:    String,
      enum:    ["Cash", "UPI", "Card", "NetBanking"],
      default: null,
    },

    paymentStatus: {
      type:    String,
      enum:    ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },

    paymentId: {
      type:    String,
      default: null,
    },

    ////////////////////////////////////////////////////////////////////
    //// ORDER STATUS
    ////////////////////////////////////////////////////////////////////

    status: {
      type:    String,
      enum:    ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    // For sell requests — seller notes about the device
    sellerNote: {
>>>>>>> 22920d66eb19a7c71f402d6da516a675ec8a3947
      type:    String,
      default: null,
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ stripePaymentIntentId: 1 });
=======
////////////////////////////////////////////////////////////////////
//// INDEXES
////////////////////////////////////////////////////////////////////

orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ seller: 1, createdAt: -1 });
orderSchema.index({ product: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ transactionType: 1 });
>>>>>>> 22920d66eb19a7c71f402d6da516a675ec8a3947

const OrderModel = mongoose.model("Order", orderSchema);

OrderModel.COMMISSION_RATES = COMMISSION_RATES;

module.exports = OrderModel;