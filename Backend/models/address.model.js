const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    // ─── OWNER ─────────────────────────────────────────────────────────────────

    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: [true, "User ID is required"],
    },

    // ─── CONTACT ───────────────────────────────────────────────────────────────

    email: {
      type:      String,
      required:  [true, "Email is required"],
      lowercase: true,
      trim:      true,
    },

    phone: {
      type:     String,
      required: [true, "Phone number is required"],
      trim:     true,
    },

    // ─── ADDRESS FIELDS ────────────────────────────────────────────────────────

    street: {
      type:     String,
      required: [true, "Street is required"],
      trim:     true,
    },

    city: {
      type:     String,
      required: [true, "City is required"],
      trim:     true,
    },

    state: {
      type:     String,
      required: [true, "State is required"],
      trim:     true,
    },

    zipcode: {
      type:     String,
      required: [true, "Zipcode is required"],
      trim:     true,
    },

    country: {
      type:     String,
      required: [true, "Country is required"],
      trim:     true,
      default:  "India",
    },

    // ─── DEFAULT FLAG ──────────────────────────────────────────────────────────

    isDefault: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ─── INDEXES ───────────────────────────────────────────────────────────────────

addressSchema.index({ userId: 1 });                      // fast lookup by user
addressSchema.index({ userId: 1, isDefault: -1 });       // default address first

module.exports = mongoose.model("Address", addressSchema);