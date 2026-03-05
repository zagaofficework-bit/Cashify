const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

/**
 * - POST /api/auth/register
 * - Send OTP for registration
 */
router.post("/register", authController.userRegisterController);

/**
 * - POST /api/auth/register/verify-otp
 * - Verify OTP and create user
 */
router.post("/register/verify-otp", authController.verifyRegisterOtpController);

/**
 * - POST /api/auth/login
 * - Send OTP for login
 */
router.post("/login", authController.userLoginController);

/**
 * - POST /api/auth/login/verify-otp
 * - Verify OTP and login user
 */
router.post("/login/verify-otp", authController.verifyLoginOtpController);

/**
 * - POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController);

module.exports = router;