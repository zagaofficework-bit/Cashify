const { authMiddleware, authorize } = require("./auth.middleware");

////////////////////////////////////////////////////////////////////
//// ADMIN ONLY — combines authenticate + authorize("admin")
//// Use this on any route only admin should access
////////////////////////////////////////////////////////////////////

const adminOnly = [authMiddleware, authorize("admin")];

module.exports = adminOnly;