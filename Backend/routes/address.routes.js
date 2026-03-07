const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controller/address.controller");

router.post("/", authMiddleware, addAddress);
router.get("/", authMiddleware, getAddresses);
router.put("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);
router.patch("/:id/set-default", authMiddleware, setDefaultAddress);

module.exports = router;