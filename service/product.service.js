const Product = require("../models/product.model");

exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

exports.getProducts = async (query) => {
  const filter = {};

  if (query.category) filter.category = query.category;
  if (query.condition) filter.condition = query.condition;

  return await Product.find(filter)
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("owner", "name email");
};

exports.getProductById = async (id) => {
  return await Product.findById(id).populate("owner", "name email");
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};