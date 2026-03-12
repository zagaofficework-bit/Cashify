const mongoose = require("mongoose");
const ProductSpecs = require("../models/productspecs.model");
const Product = require("../models/product.model");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// ─── ADD / UPDATE SPECS ────────────────────────────────────────────────────
// POST /api/products/:id/specs

exports.upsertSpecs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.user.role !== "admin" &&
      product.listedBy.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update specs for this product" });
    }

    const {
      performance,
      display,
      rearCamera,
      frontCamera,
      battery,
      storageInfo,
    } = req.body;

    const specs = await ProductSpecs.findOneAndUpdate(
      { product: id },
      {
        $set: {
          product: id,
          ...(performance && { performance }),
          ...(display && { display }),
          ...(rearCamera && { rearCamera }),
          ...(frontCamera !== undefined && { frontCamera }),
          ...(battery && { battery }),
          ...(storage && { storageInfo }),
        },
      },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Specs saved successfully",
      data: specs,
    });
  } catch (error) {
    console.error("upsertSpecs error:", error);
    res.status(500).json({ message: "Failed to save specs" });
  }
};

// ─── GET SPECS FOR ONE PRODUCT ─────────────────────────────────────────────
// GET /api/products/:id/specs

exports.getSpecs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const specs = await ProductSpecs.findOne({ product: id })
      .populate("product", "title brand images price condition status")
      .lean();

    if (!specs) {
      return res
        .status(404)
        .json({ message: "No specs found for this product" });
    }

    res.status(200).json({ success: true, data: specs });
  } catch (error) {
    console.error("getSpecs error:", error);
    res.status(500).json({ message: "Failed to fetch specs" });
  }
};

// ─── DELETE SPECS ──────────────────────────────────────────────────────────
// DELETE /api/products/:id/specs

exports.deleteSpecs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    await ProductSpecs.findOneAndDelete({ product: id });

    res
      .status(200)
      .json({ success: true, message: "Specs deleted successfully" });
  } catch (error) {
    console.error("deleteSpecs error:", error);
    res.status(500).json({ message: "Failed to delete specs" });
  }
};

// ─── COMPARE PRODUCTS ─────────────────────────────────────────────────────
// GET /api/products/compare?ids=id1,id2,id3

exports.compareProducts = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res
        .status(400)
        .json({ message: "Provide product IDs as ?ids=id1,id2,id3" });
    }

    const idList = ids.split(",").map((id) => id.trim());

    if (idList.length < 2) {
      return res
        .status(400)
        .json({ message: "Provide at least 2 product IDs to compare" });
    }
    if (idList.length > 4) {
      return res
        .status(400)
        .json({ message: "Cannot compare more than 4 products" });
    }

    const invalid = idList.filter((id) => !isValidObjectId(id));
    if (invalid.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid product ID(s): ${invalid.join(", ")}` });
    }

    // Fetch products + specs in parallel
    const [products, specsArr] = await Promise.all([
      Product.find({ _id: { $in: idList } })
        .select(
          "title brand category deviceType condition storage color price originalPrice images rating status address listedByRole createdAt",
        )
        .lean(),
      ProductSpecs.find({ product: { $in: idList } }).lean(),
    ]);

    // Map specs by productId for quick lookup
    const specsMap = {};
    specsArr.forEach((s) => {
      specsMap[s.product.toString()] = s;
    });

    // Build response in requested order
    const comparison = idList.map((id) => {
      const product = products.find((p) => p._id.toString() === id);
      if (!product) return null;

      const specs = specsMap[id] || null;

      return {
        id: product._id,

        // ── From Product model ──────────────────────────────────────
        basic: {
          title: product.title,
          brand: product.brand || "N/A",
          category: product.category,
          deviceType: product.deviceType,
          thumbnail: product.images?.[0] || null,
        },

        pricing: {
          price: product.price,
          originalPrice: product.originalPrice || null,
          discount: product.originalPrice
            ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`
            : null,
        },

        listing: {
          status: product.status,
          rating: product.rating,
          location: product.address?.city
            ? `${product.address.city}, ${product.address.state}`
            : "N/A",
          listedAt: product.createdAt,
        },

        // ── From ProductSpecs model ─────────────────────────────────
        performance: specs?.performance
          ? {
              chipset: specs.performance.chipsetFull || "N/A",
              ram: specs.performance.ram || "N/A",
            }
          : null,

        display: specs?.display
          ? {
              size:
                specs.display.sizeInches && specs.display.sizeCm
                  ? `${specs.display.sizeInches} (${specs.display.sizeCm})`
                  : specs.display.sizeInches || "N/A",
              type: specs.display.type || "N/A",
              resolution:
                specs.display.resolution && specs.display.resolutionType
                  ? `${specs.display.resolution} (${specs.display.resolutionType})`
                  : specs.display.resolution || "N/A",
              refreshRate: specs.display.refreshRate || "N/A",
            }
          : null,

        rearCamera: specs?.rearCamera
          ? {
              primary: specs.rearCamera.primary || "N/A",
              secondary: specs.rearCamera.secondary || "N/A",
              tertiary: specs.rearCamera.tertiary || "N/A",
              quaternary: specs.rearCamera.quaternary || "N/A",
            }
          : null,

        frontCamera: specs?.frontCamera || "N/A",

        battery: specs?.battery
          ? {
              capacity: specs.battery.capacity || "N/A",
              wiredCharging: specs.battery.wiredCharging || "N/A",
            }
          : null,

        storageInfo: specs?.storageInfo
          ? {
              internal: product.storage || "N/A",
              storageType: specs.storageInfo.storageType || "N/A",
            }
          : null,
      };
    });

    const notFound = idList.filter((_, i) => comparison[i] === null);
    if (notFound.length > 0) {
      return res
        .status(404)
        .json({ message: `Product(s) not found: ${notFound.join(", ")}` });
    }

    res.status(200).json({
      success: true,
      count: comparison.length,
      data: comparison,
    });
  } catch (error) {
    console.error("compareProducts error:", error);
    res.status(500).json({ message: "Failed to compare products" });
  }
};
