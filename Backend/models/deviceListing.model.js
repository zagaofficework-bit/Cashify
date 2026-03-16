const mongoose = require("mongoose");

const deviceListingSchema = new mongoose.Schema(
  {
    // ─── SELLER (the user selling their device) ────────────────────
    listedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    // ─── DEVICE INFO ───────────────────────────────────────────────
    brand:    { type: String, required: true },  // "Apple"
    model:    { type: String, required: true },  // "Apple iPhone 6"
    ram:      { type: String, default: null },   // "1 GB"
    storage:  { type: String, required: true },  // "16 GB"
    image:    { type: String, default: null },   // from catalog

    // ─── EVALUATION ANSWERS ────────────────────────────────────────
    evaluation: {
      // Device Details
      canMakeCalls:        { type: Boolean, default: true },
      touchWorking:        { type: Boolean, default: true },
      originalScreen:      { type: Boolean, default: true },

      // Functional issues selected by user
      defects: [
        {
          key:        { type: String },   // "front_camera_not_working"
          label:      { type: String },   // "Front Camera not working"
          deduction:  { type: Number },   // percentage deducted e.g. 5
        }
      ],

      // Accessories available
      hasOriginalCharger: { type: Boolean, default: false },
      hasOriginalBox:     { type: Boolean, default: false },
    },

    // ─── PRICING ───────────────────────────────────────────────────
    basePrice:         { type: Number, required: true },  // fixed from catalog
    totalDeduction:    { type: Number, default: 0 },      // sum of all deductions %
    deductionAmount:   { type: Number, default: 0 },      // ₹ deducted
    processingFee:     { type: Number, default: 0 },      // flat fee e.g. ₹49
    finalPrice:        { type: Number, required: true },  // what user receives

    // ─── STATUS ────────────────────────────────────────────────────
    status: {
      type:    String,
      enum:    ["available", "accepted", "completed", "rejected", "cancelled"],
      default: "available",
    },

    // ─── SELLER WHO ACCEPTED ───────────────────────────────────────
    acceptedBy: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "User",
      default: null,
    },

    acceptedAt:  { type: Date, default: null },
    completedAt: { type: Date, default: null },
    rejectedAt:  { type: Date, default: null },

    rejectionReason: { type: String, default: null },
  },
  { timestamps: true }
);

deviceListingSchema.index({ listedBy: 1 });
deviceListingSchema.index({ status: 1 });
deviceListingSchema.index({ brand: 1, model: 1 });

module.exports = mongoose.model("DeviceListing", deviceListingSchema);