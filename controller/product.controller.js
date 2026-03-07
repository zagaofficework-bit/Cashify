const mongoose = require("mongoose");
const ProductService     = require("../service/product.service");
const uploadToCloudinary = require("../helper/cloudinaryUpload");


// HELPER — Validate MongoDB ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// CREATE PRODUCT — admin only
exports.createProduct = async (req, res) => {
  try {
    // 1. Upload images in parallel
    let imageUrls = [];
    if (req.files?.images && req.files.images.length > 0) {
      const results = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, { resourceType: "image" })
        )
      );
      imageUrls = results.map((r) => r.secure_url);
    }

    // 2. Upload video if provided
    let videoUrl = null;
    if (req.files?.video && req.files.video.length > 0) {
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resourceType: "video",
      });
      videoUrl = result.secure_url;
    }

    // 3. Build product data
    const productData = {
      title:        req.body.title,
      description:  req.body.description,
      category:     req.body.category,
      subcategory:  req.body.subcategory,

      condition:    req.body.condition,
      storage:      req.body.storage,
      color:        req.body.color,

      price:         Number(req.body.price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : null,
      payment:       req.body.payment,

      images: imageUrls,
      video:  videoUrl,

      listedBy: req.user._id,

      inStock: true,
    };

    const product = await ProductService.createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      data:    product,
    });
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Failed to create product. Please try again" });
  }
};


// GET ALL PRODUCTS — public
exports.getProducts = async (req, res) => {
  try {
    const result = await ProductService.getProducts(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("getProducts error:", error);
    res.status(500).json({ message: "Failed to fetch products. Please try again" });
  }
};


// GET PRODUCT BY ID — public
exports.getProductById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("getProductById error:", error);
    res.status(500).json({ message: "Failed to fetch product. Please try again" });
  }
};


// UPDATE PRODUCT — admin only
exports.updateProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Upload new images if provided
    if (req.files?.images && req.files.images.length > 0) {
      const results = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, { resourceType: "image" })
        )
      );
      req.body.images = results.map((r) => r.secure_url);
    }

    // Upload new video if provided
    if (req.files?.video && req.files.video.length > 0) {
      const result = await uploadToCloudinary(req.files.video[0].buffer, {
        resourceType: "video",
      });
      req.body.video = result.secure_url;
    }

    // Convert price fields to numbers if provided
    if (req.body.price)         req.body.price         = Number(req.body.price);
    if (req.body.originalPrice) req.body.originalPrice = Number(req.body.originalPrice);

    const product = await ProductService.updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data:    product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Failed to update product. Please try again" });
  }
};


// DELETE PRODUCT — admin only
exports.deleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Failed to delete product. Please try again" });
  }
};