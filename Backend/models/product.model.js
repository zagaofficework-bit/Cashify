const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    
    // BASIC INFO
    title: {
      type:     String,
      required: [true, "Product title is required"],
      trim:     true,
    },

    description: {
      type:  String,
      trim:  true,
    },

    category: {
      type:     String,
      required: [true, "Category is required"],
      enum:     ["mobile", "laptop", "tablet", "smartwatch", "camera", "other"],
    },

    subcategory: {
      type:  String,
      trim:  true,
    },

    brand: {
      type:  String,
      trim:  true,
    },

    
    // DEVICE TYPE
    deviceType: {
      type:     String,
      enum:     ["new", "refurbished", "old"],
      required: [true, "Device type is required"],
    },

    
    // DEVICE SPECS
    condition: {
      type:     String,
      enum:     ["Fair", "Good", "Superb"],
      required: [true, "Condition is required"],
    },

    storage: {
      type:  String,
      trim:  true,
    },

    color: {
      type:  String,
      trim:  true,
    },

    
    // PRICING & PAYMENT
    price: {
      type:     Number,
      required: [true, "Price is required"],
      min:      [0, "Price cannot be negative"],
    },

    originalPrice: {
      type:    Number,
      default: null,
    },

    payment: {
      type:     String,
      enum:     ["Cash", "UPI", "Card", "NetBanking"],
      required: [true, "Payment method is required"],
    },

    
    // MEDIA
    images: {
      type:     [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 5,
        message:   "Product must have between 1 and 5 images",
      },
    },

    video: {
      type:    String,
      default: null,
    },

    
    // LOCATION — GeoJSON Point (copied from seller/user at listing time)
    location: {
      type: {
        type:    String,
        enum:    ["Point"],
        default: "Point",
      },
      coordinates: {
        type:     [Number], // [longitude, latitude]
        required: true,
      },
    },

    // Human readable location
    address: {
      city:    { type: String },
      state:   { type: String },
      pincode: { type: String },
      full:    { type: String },
    },

    // OWNERSHIP
    listedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: [true, "listedBy is required"],
    },

    listedByRole: {
      type:  String,
      enum:  ["seller", "user"],
    },

    // COMMISSION
    // Admin takes commission on every transaction
    commissionRate: {
      type:    Number,
      default: 5, 
    },

    // STATUS
    status: {
      type:    String,
      enum:    ["available", "sold", "inactive"],
      default: "available",
    },

    rating: {
      type:    Number,
      default: 0,
      min:     0,
      max:     5,
    },
    quantity: {
      type:    Number,
      default: 1,
      min:     1,
    },
  },
  {
    timestamps: true,
  }
);


// INDEXES
// Geospatial index — REQUIRED for $near / $geoWithin queries
productSchema.index({ location: "2dsphere" });
productSchema.index({ title: "text", description: "text", brand: "text" });
productSchema.index({ category: 1, condition: 1, price: 1 });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ status: 1 });
productSchema.index({ listedBy: 1 });
productSchema.index({ deviceType: 1 });

module.exports = mongoose.model("Product", productSchema);