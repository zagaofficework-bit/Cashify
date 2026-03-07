const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ─── Parties ──────────────────────────────────────────
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
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

    // Snapshot of product at time of order (in case product is deleted later)
    productSnapshot: {
      title: String,
      price: Number,
      condition: String,
      storage: String,
      color: String,
      category: String,
      subcategory: String,
      image: String,       // store only first image
    },

    // ─── Pricing ──────────────────────────────────────────
    amount: {
      type: Number,
      required: true,
    },

    // ─── Payment ──────────────────────────────────────────
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "NetBanking", "Stripe"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    stripePaymentIntentId: {
      type: String,
      default: null,        // filled when Stripe is integrated
    },

    // ─── Shipping Address ─────────────────────────────────
    shippingAddress: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
      email: String,
    },

    // ─── Order Status ─────────────────────────────────────
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Placed",
    },

    // ─── Cancellation ─────────────────────────────────────
    cancelledBy: {
      type: String,
      enum: ["Buyer", "Seller", "Admin", null],
      default: null,
    },
    cancellationReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes for common queries
orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ seller: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);