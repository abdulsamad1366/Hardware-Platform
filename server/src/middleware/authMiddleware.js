const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Read token from Authorization Header or Cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // Check if token exists
  if (!token) {
    return next(new ApiError(401, "Authentication required. Please sign in."));
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Load user profile from DB (excluding hashed password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new ApiError(404, "User profile not found. Session invalid."));
    }

    // 4. Bind user session to req object
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token. Please sign in again."));
  }
});

// Role-based authorization gate helper
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied. Role '${req.user?.role || "guest"}' is not authorized.`)
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
