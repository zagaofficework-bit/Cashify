const User = require("../models/user.model");

// ─── ADD ADDRESS ─────────────────────────────────────────────────
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, mobile, street, city, state, pincode, country, isDefault } = req.body;

    if (!email || !mobile || !street || !city || !state || !pincode || !country) {
      return res.status(400).json({ message: "All address fields are required" });
    }

    const user = await User.findById(userId);

    // If first address OR isDefault requested — unset all others
    const shouldBeDefault = user.address.length === 0 ? true : !!isDefault;

    if (shouldBeDefault) {
      user.address.forEach(addr => addr.isDefault = false);
    }

    user.address.push({
      email,
      mobile,
      street,
      city,
      state,
      pincode,
      country,
      isDefault: shouldBeDefault,
    });

    await user.save();

    // Return the newly added address (last one pushed)
    const newAddress = user.address[user.address.length - 1];

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET ALL ADDRESSES ───────────────────────────────────────────
exports.getAddresses = async (req, res) => {
  try {
    const { firstname, lastname, address } = req.user;

    // Sort: default first, then newest
    const sorted = [...address].sort((a, b) => {
      if (b.isDefault !== a.isDefault) return b.isDefault - a.isDefault;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({
      success: true,
      data: {
        name:      `${firstname} ${lastname}`,
        addresses: sorted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE ADDRESS ──────────────────────────────────────────────
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id }  = req.params;

    const user    = await User.findById(userId);
    const address = user.address.id(id); // Mongoose subdocument .id() method

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // If setting this as default, unset others
    if (req.body.isDefault) {
      user.address.forEach(addr => addr.isDefault = false);
    }

    // Update only the fields that were sent
    const allowed = ["email", "mobile", "street", "city", "state", "pincode", "country", "isDefault"];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) {
        address[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data:    address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE ADDRESS ──────────────────────────────────────────────
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id }  = req.params;

    const user    = await User.findById(userId);
    const address = user.address.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const wasDefault = address.isDefault;

    // Remove the subdocument
    user.address.pull({ _id: id });

    // If deleted was default, promote most recent remaining
    if (wasDefault && user.address.length > 0) {
      const sorted = user.address.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      sorted[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── SET DEFAULT ADDRESS ─────────────────────────────────────────
exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id }  = req.params;

    const user    = await User.findById(userId);
    const address = user.address.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Unset all, then set this one
    user.address.forEach(addr => addr.isDefault = false);
    address.isDefault = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Default address updated",
      data:    address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};