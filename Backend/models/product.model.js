const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    condition: {
      type: String,
      enum: ["Fair", "Good", "Superb"],
      required: true,
    },

    storage: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    payment: {
      type: String,
      enum: ["Cash", "UPI", "Card", "NetBanking"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    subcategory: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ownerPicture: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ condition: 1 });

module.exports = mongoose.model("Product", ProductSchema);