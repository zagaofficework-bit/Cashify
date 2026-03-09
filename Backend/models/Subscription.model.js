const mongoose = require("mongoose");

////////////////////////////////////////////////////////////////////
//// PLAN CONFIG — single source of truth
////////////////////////////////////////////////////////////////////

const PLANS = {
  basic: {
    name:            "Basic",
    price:           2999,
    activeListings:  20,
    prioritySupport: false,
    supportType:     "none",
  },
  standard: {
    name:            "Standard",
    price:           5999,
    activeListings:  100,
    prioritySupport: true,
    supportType:     "email",
  },
  premium: {
    name:            "Premium",
    price:           11999,
    activeListings:  -1,       // -1 = unlimited
    prioritySupport: true,
    supportType:     "chat+call",
  },
};

////////////////////////////////////////////////////////////////////
//// SCHEMA
////////////////////////////////////////////////////////////////////

const subscriptionSchema = new mongoose.Schema(
  {
    seller: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    plan: {
      type:     String,
      enum:     ["basic", "standard", "premium"],
      required: true,
    },

    price: {
      type:     Number,
      required: true,
    },

    activeListingsLimit: {
      type:    Number,
      default: 20, // -1 = unlimited
    },

    prioritySupport: {
      type:    Boolean,
      default: false,
    },

    supportType: {
      type:    String,
      enum:    ["none", "email", "chat+call"],
      default: "none",
    },

    startDate: {
      type:    Date,
      default: Date.now,
    },

    endDate: {
      type:     Date,
      required: true,
    },

    isActive: {
      type:    Boolean,
      default: true,
    },

    paymentId: {
      type:    String,
      default: null,
    },

    paymentMethod: {
      type:    String,
      enum:    ["UPI", "Card", "NetBanking", "Cash"],
      default: null,
    },
  },
  { timestamps: true }
);

subscriptionSchema.index({ seller: 1 });
subscriptionSchema.index({ isActive: 1, endDate: 1 });

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

SubscriptionModel.PLANS = PLANS;

module.exports = SubscriptionModel;