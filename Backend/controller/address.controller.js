const Address = require("../models/address.model");

// ─── ADD ADDRESS ────────────────────────────────────────────────
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, phone, street, city, state, zipcode, country, isDefault } = req.body;

    if (!email || !phone || !street || !city || !state || !zipcode || !country) {
      return res.status(400).json({ message: "All address fields are required" });
    }

    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const existingCount = await Address.countDocuments({ userId });
    const shouldBeDefault = existingCount === 0 ? true : !!isDefault;

    const address = await Address.create({
      userId,
      email,
      phone,
      street,
      city,
      state,
      zipcode,
      country,
      isDefault: shouldBeDefault,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET ALL ADDRESSES ──────────────────────────────────────────
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Pull name from the already-fetched req.user (no extra DB call needed)
    const { firstname, lastname } = req.user;

    const addresses = await Address.find({ userId }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        name: `${firstname} ${lastname}`,   // ← attached at response level
        addresses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE ADDRESS ─────────────────────────────────────────────
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // Ownership check — user can only update their own address
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (req.body.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const updated = await Address.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── DELETE ADDRESS ─────────────────────────────────────────────
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    // Ownership check
    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.findByIdAndDelete(id);

    // If deleted address was default, promote the most recent one
    if (address.isDefault) {
      const next = await Address.findOne({ userId }).sort({ createdAt: -1 });
      if (next) {
        next.isDefault = true;
        await next.save();
      }
    }

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
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await Address.updateMany({ userId }, { isDefault: false });
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};