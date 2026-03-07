const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Product title is required"],
      trim:     true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type:     String,
      required: [true, "Category is required"],
      enum:     ["mobile", "laptop", "tablet", "smartwatch", "camera", "other"],
    },

    subcategory: {
      type:     String,
      required: [true, "Subcategory is required"],
      trim:     true,
    },

    
    // DEVICE SPECS
    

    condition: {
      type:     String,
      required: [true, "Condition is required"],
      enum:     ["Fair", "Good", "Superb"],
    },

    storage: {
      type:     String,
      required: [true, "Storage is required"],
      trim:     true,
    },

    color: {
      type:     String,
      required: [true, "Color is required"],
      trim:     true,
    },

    
    // PRICING & PAYMENT
    

    price: {
      type:     Number,
      required: [true, "Price is required"],
      min:      [0, "Price cannot be negative"],
    },

    // Original retail price — for showing "you save X%" on frontend
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

    // Optional product demo video
    video: {
      type:    String,
      default: null,
    },

    
    // RATINGS
    

    rating: {
      type:    Number,
      default: 0,
      min:     0,
      max:     5,
    },

    
    // TRACEABILITY — only admin who listed it
    

    listedBy: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: [true, "listedBy (admin) is required"],
    },

    
    // STATUS
    

    inStock: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text search across title and description
ProductSchema.index({ title: "text", description: "text" });

// Compound indexes for common filter combinations
ProductSchema.index({ category: 1, condition: 1, price: 1 });
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ inStock: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ condition: 1 });

module.exports = mongoose.model("Product", ProductSchema);