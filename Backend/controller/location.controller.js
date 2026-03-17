const { reverseGeocode, forwardGeocode } = require("../helper/geocode.helper");
const UserModel = require("../models/user.model");
const Address   = require("../models/address.model");

////////////////////////////////////////////////////////////////////
//// REVERSE GEOCODE — get address from GPS coordinates
//// POST /api/location/reverse-geocode
//// Called by frontend after getting GPS coords
////////////////////////////////////////////////////////////////////

exports.reverseGeocode = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "latitude and longitude are required",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ message: "Coordinates out of valid range" });
    }

    const address = await reverseGeocode(lat, lng);

    res.status(200).json({
      success: true,
      data:    address,
    });
  } catch (error) {
    console.error("reverseGeocode error:", error);
    res.status(500).json({ message: "Failed to get address from coordinates" });
  }
};


////////////////////////////////////////////////////////////////////
//// FORWARD GEOCODE — get coordinates from address string
//// POST /api/location/forward-geocode
////////////////////////////////////////////////////////////////////

exports.forwardGeocode = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address?.trim()) {
      return res.status(400).json({ message: "address string is required" });
    }

    const coords = await forwardGeocode(address.trim());

    res.status(200).json({
      success: true,
      data:    coords,
    });
  } catch (error) {
    console.error("forwardGeocode error:", error);
    res.status(500).json({ message: "Failed to get coordinates from address" });
  }
};


////////////////////////////////////////////////////////////////////
//// SAVE LOCATION — saves GPS coordinates to user profile
//// PATCH /api/location/save
//// Also auto-fills defaultAddress from reverse geocode
////////////////////////////////////////////////////////////////////

exports.saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId                  = req.user._id;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "latitude and longitude are required",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    // Reverse geocode to get human readable address
    const geocoded = await reverseGeocode(lat, lng);

    // Update user location (GeoJSON) + defaultAddress snapshot
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          location: {
            type:        "Point",
            coordinates: [lng, lat],   // GeoJSON is [longitude, latitude]
          },
          defaultAddress: {
            city:    geocoded.city    || null,
            state:   geocoded.state   || null,
            pincode: geocoded.pincode || null,
            full:    geocoded.full    || null,
          },
        },
      },
      { new: true }
    ).select("firstname location defaultAddress").lean();

    res.status(200).json({
      success: true,
      message: "Location saved successfully",
      data: {
        coordinates: { latitude: lat, longitude: lng },
        address:     geocoded,
        user:        user.defaultAddress,
      },
    });
  } catch (error) {
    console.error("saveLocation error:", error);
    res.status(500).json({ message: "Failed to save location" });
  }
};


////////////////////////////////////////////////////////////////////
//// SAVE AS ADDRESS — saves GPS location as a new Address document
//// POST /api/location/save-as-address
//// User gets GPS location → confirm → saved as address in profile
////////////////////////////////////////////////////////////////////

exports.saveAsAddress = async (req, res) => {
  try {
    const { latitude, longitude, isDefault } = req.body;
    const userId                             = req.user._id;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "latitude and longitude are required",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    // Reverse geocode
    const geocoded = await reverseGeocode(lat, lng);

    if (!geocoded.city || !geocoded.state) {
      return res.status(400).json({
        message: "Could not determine city/state from these coordinates. Try entering address manually.",
      });
    }

    const existingCount   = await Address.countDocuments({ userId });
    const shouldBeDefault = existingCount === 0 ? true : !!isDefault;

    if (shouldBeDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const address = await Address.create({
      userId,
      street:    geocoded.street  || "Detected via GPS",
      city:      geocoded.city,
      state:     geocoded.state,
      pincode:   geocoded.pincode || "",
      country:   geocoded.country || "India",
      isDefault: shouldBeDefault,
    });

    // Also update user's GeoJSON location + defaultAddress snapshot
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        location: {
          type:        "Point",
          coordinates: [lng, lat],
        },
        ...(shouldBeDefault && {
          defaultAddress: {
            city:    geocoded.city,
            state:   geocoded.state,
            pincode: geocoded.pincode || null,
            full:    geocoded.full    || null,
          },
        }),
      },
    });

    res.status(201).json({
      success: true,
      message: "Location detected and saved as address",
      data: {
        address,
        detectedFrom: {
          latitude:  lat,
          longitude: lng,
          full:      geocoded.full,
        },
      },
    });
  } catch (error) {
    console.error("saveAsAddress error:", error);
    res.status(500).json({ message: "Failed to save location as address" });
  }
};