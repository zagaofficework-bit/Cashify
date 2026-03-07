const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const redisClient = require("../config/redis.client");

const BLACKLIST_KEY = (token) => `blacklist:${token}`;


async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Redis blacklist check — O(1), no DB hit
    const isBlacklisted = await redisClient.get(BLACKLIST_KEY(token));
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token has been invalidated. Please login again",
      });
    }

    // Verify signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Confirm user exists
    const user = await userModel.findById(decoded.userId).select("-refreshToken").lean();
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user  = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired. Please refresh your token",
        code: "TOKEN_EXPIRED",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid access token",
        code: "TOKEN_INVALID",
      });
    }
    res.status(500).json({ message: "Internal server error during authentication" });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please login first" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
}

module.exports = {
    authMiddleware,
    authorize
}