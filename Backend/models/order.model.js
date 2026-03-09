const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ─── Buyer ────────────────────────────────────────────
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ─── Product ──────────────────────────────────────────
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

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
      required: true,
    },

    // ─── Payment ──────────────────────────────────────────
    paymentMethod: {
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
      type:    String,
      default: null,
    },
  },
  { timestamps: true }
);

orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ stripePaymentIntentId: 1 });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);