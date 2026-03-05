const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");
const upload = require("../middleware/upload.middleware");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * Public routes
 */

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

/**
 * Protected routes
 */

router.post(
  "/",
  authMiddleware.authMiddleware,
  upload.array("images", 5),
  ProductController.createProduct
);

router.put("/:id", authMiddleware.authMiddleware, ProductController.updateProduct);

router.delete("/:id", authMiddleware.authMiddleware, ProductController.deleteProduct);

module.exports = router;