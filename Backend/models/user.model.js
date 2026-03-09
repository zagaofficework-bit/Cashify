const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type:     String,
      required: [true, "First name is required"],
      trim:     true,
    },

    lastname: {
      type:  String,
      trim:  true,
    },

    email: {
      type:     String,
      required: [true, "Email is required"],
      unique:   true,
      lowercase: true,
      trim:     true,
    },

    mobile: {
      type:     String,
      required: [true, "Mobile is required"],
      unique:   true,
      trim:     true,
    },

    profilePic: {
      type:    String,
      default: null,
    }, 

    role: {
      type:    String,
      enum:    ["admin", "seller", "user"],
      default: "user",
    },
    // LOCATION — GeoJSON Point for proximity search
    location: {
      type: {
        type:    String,
        enum:    ["Point"],
        default: "Point",
      },
      coordinates: {
        type:    [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },

    address: {
      city:    { type: String, trim: true },
      state:   { type: String, trim: true },
      pincode: { type: String, trim: true },
      full:    { type: String, trim: true },
    },

    // SUBSCRIPTION — only relevant for sellers
    subscription: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     "Subscription",
      default: null,
    },

    // AUTH
    refreshToken: {
      type:    String,
      default: null,
    },

    isVerified: {
      type:    Boolean,
      default: false,
    },

    isActive: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// INDEXES
// Geospatial index for location-based queries
userSchema.index({ location: "2dsphere" });
userSchema.index({ role: 1 });
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });

module.exports = mongoose.model("User", userSchema);