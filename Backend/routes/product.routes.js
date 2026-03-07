const express           = require("express");
const router            = express.Router();
const ProductController = require("../controller/product.controller");
const adminOnly         = require("../middleware/Adminonly.middleware");
const { productUpload, validateProductFiles } = require("../middleware/multer.middleware");

////////////////////////////////////////////////////////////////////
//// PUBLIC ROUTES — anyone can view products
////////////////////////////////////////////////////////////////////

router.get("/",    ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

////////////////////////////////////////////////////////////////////
//// ADMIN ONLY ROUTES — create, update, delete
////////////////////////////////////////////////////////////////////

router.post(
  "/",
  ...adminOnly,              
  productUpload,             
  validateProductFiles,      
  ProductController.createProduct
);

router.put(
  "/:id",
  ...adminOnly,
  productUpload,
  validateProductFiles,
  ProductController.updateProduct
);

router.delete(
  "/:id",
  ...adminOnly,
  ProductController.deleteProduct
);

module.exports = router;