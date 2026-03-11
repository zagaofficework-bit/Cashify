const mongoose           = require("mongoose");
const ProductService     = require("../service/product.service");
const uploadToCloudinary = require("../helper/cloudinaryUpload");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// ─── CREATE PRODUCT ───────────────────────────────────────────────────────────
// seller → new, refurbished, old
// user   → old only
// admin  → blocked via middleware

exports.createProduct = async (req, res) => {
  try {
    // 1. Upload images in parallel
    let imageUrls = [];
    if (req.files?.images?.length > 0) {
      const results = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.buffer, { resourceType: "image" })
        )
      );
      imageUrls = results.map((r) => r.secure_url);
    }

    // 2. Upload video if provided
    let videoUrl = null;
    if (req.files?.video?.length > 0) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        { resourceType: "video" }
      );
      videoUrl = result.secure_url;
    }

    // 3. Use lister's saved location if coordinates not provided
    const coordinates =
      req.body.longitude && req.body.latitude
        ? [Number(req.body.longitude), Number(req.body.latitude)]
        : req.user.location?.coordinates || [0, 0];

    // 4. Build product data
    const productData = {
      title:         req.body.title,
      description:   req.body.description,
      category:      req.body.category,
      subcategory:   req.body.subcategory,
      brand:         req.body.brand,
      deviceType:    req.body.deviceType,
      condition:     req.body.condition,
      storage:       req.body.storage,
      color:         req.body.color,
      price:         Number(req.body.price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : null,
      payment:       req.body.payment,
      images:        imageUrls,
      video:         videoUrl,
      listedBy:      req.user._id,
      listedByRole:  req.user.role,
      location: {
        type:        "Point",
        coordinates,
      },
      address: {
        city:    req.body.city    || req.user.address?.city,
        state:   req.body.state   || req.user.address?.state,
        pincode: req.body.pincode || req.user.address?.pincode,
        full:    req.body.address || req.user.address?.full,
      },
      status: "available",
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


// ─── GET ALL PRODUCTS — public ─────────────────────────────────────────────────

exports.getProducts = async (req, res) => {
  try {
    const result = await ProductService.getProducts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("getProducts error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


// ─── GET MY LISTINGS — seller/user only ───────────────────────────────────────

exports.getMyProducts = async (req, res) => {
  try {
    const result = await ProductService.getMyProducts(req.user._id, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("getMyProducts error:", error);
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};


// ─── GET PRODUCT BY ID — public ───────────────────────────────────────────────

exports.getProductById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("getProductById error:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


// ─── UPDATE PRODUCT — owner only ──────────────────────────────────────────────

exports.updateProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Upload new images if provided
    if (req.files?.images?.length > 0) {
      const results = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.buffer, { resourceType: "image" })
        )
      );
      req.body.images = results.map((r) => r.secure_url);
    }

    // Upload new video if provided
    if (req.files?.video?.length > 0) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        { resourceType: "video" }
      );
      req.body.video = result.secure_url;
    }

    if (req.body.price)         req.body.price         = Number(req.body.price);
    if (req.body.originalPrice) req.body.originalPrice = Number(req.body.originalPrice);

    const product = await ProductService.updateProduct(
      req.params.id,
      req.user._id,
      req.body
    );

    if (!product) {
      return res.status(403).json({
        message: "Product not found or you are not authorized to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data:    product,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};


// ─── DELETE PRODUCT — owner only ──────────────────────────────────────────────

exports.deleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductService.deleteProduct(
      req.params.id,
      req.user._id,
      req.user.role
    );

    if (!product) {
      return res.status(403).json({
        message: "Product not found or you are not authorized to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};