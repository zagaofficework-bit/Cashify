const ProductService = require("../service/product.service");
const uploadToCloudinary = require("../helper/cloudinaryUpload");

/**
 * Create Product
 */
exports.createProduct = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const productData = {
      ...req.body,
      images: imageUrls,
      owner: req.user._id,
      ownerPicture: req.user.profilePic,
    };

    const product = await ProductService.createProduct(productData);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Get All Products
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts(req.query);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Get Product By ID
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Update Product
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductService.updateProduct(
      req.params.id,
      req.body
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Delete Product
 */
exports.deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};