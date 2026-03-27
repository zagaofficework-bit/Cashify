// models/deviceListing.model.js
const mongoose = require("mongoose");

// ─── Timeslot sub-document ────────────────────────────────────────
const timeslotSchema = new mongoose.Schema(
  {
    date:      { type: String, required: true },  // "2025-04-10"
    timeRange: { type: String, required: true },  // "10:00 AM – 12:00 PM"
  },
  { _id: false }
);

// ─── Pickup sub-document ──────────────────────────────────────────
// Created by the backend when a seller accepts the listing.
// The user then fills in their preferred slot + payment method.
const pickupSchema = new mongoose.Schema(
  {
    // Status of the pickup negotiation
    // awaiting_user_confirmation → user hasn't chosen slot/payment yet
    // scheduled                 → user confirmed slot + payment method
    // completed                 → seller marked listing complete
    status: {
      type: String,
      enum: ["awaiting_user_confirmation", "scheduled", "completed"],
      default: "awaiting_user_confirmation",
    },

    // Proposed slots offered by the seller at accept time (1–3 slots)
    proposedSlots: [timeslotSchema],

    // The slot the user picked from proposedSlots
    confirmedSlot: { type: timeslotSchema, default: null },

    // How the seller will pay the user
    // user picks one of: cash, upi, bank_transfer
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "bank_transfer", null],
      default: null,
    },

    // UPI ID or bank account details (depending on paymentMethod)
    paymentDetails: { type: String, default: null },

    confirmedAt: { type: Date, default: null },
  },
  { _id: false }
);

const deviceListingSchema = new mongoose.Schema(
  {
    // ─── WHO IS SELLING ────────────────────────────────────────────
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ─── DEVICE INFO ───────────────────────────────────────────────
    brand:    { type: String, required: true },
    category: {
      type: String,
      enum: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      default: "mobile",
    },
    model:   { type: String, required: true },
    ram:     { type: String, default: null },
    storage: { type: String, required: true },
    image:   { type: String, default: null },

    // ─── EVALUATION ────────────────────────────────────────────────
    evaluation: {
      canMakeCalls:       { type: Boolean, default: true },
      touchWorking:       { type: Boolean, default: true },
      originalScreen:     { type: Boolean, default: true },
      defects: [
        {
          key:       { type: String },
          label:     { type: String },
          deduction: { type: Number },
        },
      ],
      hasOriginalCharger: { type: Boolean, default: false },
      hasOriginalBox:     { type: Boolean, default: false },
    },

    // ─── PRICING ───────────────────────────────────────────────────
    basePrice:       { type: Number, required: true },
    totalDeduction:  { type: Number, default: 0 },
    deductionAmount: { type: Number, default: 0 },
    processingFee:   { type: Number, default: 0 },
    finalPrice:      { type: Number, required: true },

    // ─── STATUS ────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["available", "accepted", "completed", "rejected", "cancelled"],
      default: "available",
    },

    // ─── VISIBILITY (super-seller pool logic) ──────────────────────
    visibility: {
      type: String,
      enum: ["super_seller_only", "all_sellers"],
      default: "super_seller_only",
    },
    superSellerRejected:   { type: Boolean, default: false },
    superSellerRejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    superSellerRejectedAt: { type: Date, default: null },

    // ─── SELLER WHO ACCEPTED ───────────────────────────────────────
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // ─── SUPER SELLER WINDOW ───────────────────────────────────────
    // Super seller has exclusive access until this time
    // After this → auto-flipped to all_sellers by cron job
    superSellerExpiresAt: {
      type: Date,
      default: null,
    },

    acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    acceptedAt: { type: Date, default: null },

    // ─── PICKUP & PAYMENT CONFIRMATION ────────────────────────────
    // Populated when seller accepts. User confirms slot + payment method.
    pickup: { type: pickupSchema, default: null },

    // ─── COMPLETION ────────────────────────────────────────────────
    completedAt:     { type: Date, default: null },
    rejectedAt:      { type: Date, default: null },
    rejectionReason: { type: String, default: null },
  },

  { timestamps: true },
);

deviceListingSchema.index({ listedBy: 1 });
deviceListingSchema.index({ status: 1 });
deviceListingSchema.index({ brand: 1, model: 1 });

module.exports = mongoose.model("DeviceListing", deviceListingSchema);