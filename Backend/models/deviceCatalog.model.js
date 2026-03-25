const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram:       { type: String, default: null },   // "1 GB"
  storage:   { type: String, required: true },  // "16 GB"
  basePrice: { type: Number, required: true },  // ₹1510
}, { _id: true });

const deviceModelSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true }, // "Apple iPhone 6"
  image:    { type: String, default: null },              // Cloudinary URL
  variants: [variantSchema],
  soldCount: { type: Number, default: 0 },               // "64955+ already sold"
}, { _id: true });

const deviceCatalogSchema = new mongoose.Schema(
  {
    brand:    { type: String, required: true, trim: true }, // "Apple"
    category: {
      type: String,
      enum: ["mobile", "laptop", "tablet", "smartwatch", "television"],
      default: "mobile",
    },
    models: [deviceModelSchema],
  },
  { timestamps: true }
);

deviceCatalogSchema.index({ brand: 1, category: 1 });

module.exports = mongoose.model("DeviceCatalog", deviceCatalogSchema);