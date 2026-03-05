const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: Array,
  },
  price: {
    type: String,
  },
  productpic1: {
    type: String,
  },
  productpic2: {
    type: String,
  },
  productpic3: {
    type: String,
  },
  owner: {
    type: String,
  },
  ownerpicture: {
    type: String,
  },
  catagory: {
    type: String,
    required: true,
    index: true,
  },
  subcatagory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Compound indexes for admin dashboard queries
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ catagory: 1, createdAt: -1 });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;