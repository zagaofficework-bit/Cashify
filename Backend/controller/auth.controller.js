const userModel = require("../models/user.model");
const generateAccessToken = require("../helper/auth.helper").generateAccessToken;
const generateRefreshToken = require("../helper/auth.helper").generateRefreshToken;
const generateOTP = require("../helper/auth.helper").generateOTP;
const emailService = require("../service/email.service");
const tokenBlackListModel = require("../models/blackList.model");
// Temporary OTP store (use Redis in production)
const otpStore = new Map();

////////////////////////////////////////////////////////////////////
//// REGISTER - SEND OTP
////////////////////////////////////////////////////////////////////

async function userRegisterController(req, res) {
  try {
    const { email, firstname, lastname, mobile } = req.body;

    const isExists = await userModel.findOne({ mobile });

    if (isExists) {
      return res.status(422).json({
        message: "User already exists with this mobile",
      });
    }

    const otp = generateOTP();

    otpStore.set(email, {
      otp,
      userData: { email, firstname, lastname, mobile },
      expires: Date.now() + 5 * 60 * 1000,
    });

    await emailService.sendRegistrationEmail(email, firstname, otp);

    res.status(200).json({
      message: "OTP sent to your email for verification",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

////////////////////////////////////////////////////////////////////
//// VERIFY REGISTER OTP
////////////////////////////////////////////////////////////////////

async function verifyRegisterOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    const record = otpStore.get(email);

    if (!record || record.expires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await userModel.create({
      ...record.userData,
      isVerified: true,
    });

    otpStore.delete(email);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

////////////////////////////////////////////////////////////////////
//// LOGIN - SEND OTP
////////////////////////////////////////////////////////////////////

async function userLoginController(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOTP();

    otpStore.set(email, {
      otp,
      userId: user._id,
      email: user.email,
      expires: Date.now() + 5 * 60 * 1000,
    });

    await emailService.sendLoginEmail(user.email, otp);

    res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

////////////////////////////////////////////////////////////////////
//// VERIFY LOGIN OTP
////////////////////////////////////////////////////////////////////

async function verifyLoginOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    const record = otpStore.get(email);

    if (!record || record.expires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await userModel.findById(record.userId);

    otpStore.delete(email);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

////////////////////////////////////////////////////////////////////
//// LOGOUT
////////////////////////////////////////////////////////////////////

async function userLogoutController(req, res) {
  const token =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      message: "User logged out successfully",
    });
  }

  await tokenBlackListModel.create({
    token: token,
  });

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "User logged out successfully",
  });
}

////////////////////////////////////////////////////////////////////
//// EXPORT
////////////////////////////////////////////////////////////////////

module.exports = {
  userRegisterController,
  verifyRegisterOtpController,
  userLoginController,
  verifyLoginOtpController,
  userLogoutController,
};