const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// JWT signing helper
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

// Cookie setter helper
const setTokenCookies = (res, tokens) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// @desc    Register a new B2B user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, company, gst, password, city, state, country } = req.body;

  // 1. Verify unique constraints
  const emailExists = await User.findOne({ email: email.toLowerCase() });
  if (emailExists) {
    return next(new ApiError(400, "A business account with this email address already exists."));
  }

  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    return next(new ApiError(400, "A business account with this phone number already exists."));
  }

  // 2. Create User account (triggers pre-save bcrypt hook)
  const user = await User.create({
    name,
    email,
    phone,
    company,
    gst: gst || "",
    password,
    city,
    state,
    country: country || "India",
  });

  // 3. Generate credentials and attach cookies
  const tokens = generateTokens(user._id);
  setTokenCookies(res, tokens);

  // 4. Return standard B2B JSON response
  res.status(201).json({
    success: true,
    message: "Registration successful. Welcome to SecureLink.",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        gst: user.gst,
        city: user.city,
        state: user.state,
        country: user.country,
        role: user.role,
      },
      accessToken: tokens.accessToken,
    },
  });
});

// @desc    Authenticate user & get tokens
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return next(new ApiError(401, "Invalid email or password credentials."));
  }

  // 2. Check password matches (bcrypt compare method)
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ApiError(401, "Invalid email or password credentials."));
  }

  // 3. Issue new tokens
  const tokens = generateTokens(user._id);
  setTokenCookies(res, tokens);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        gst: user.gst,
        city: user.city,
        state: user.state,
        country: user.country,
        role: user.role,
      },
      accessToken: tokens.accessToken,
    },
  });
});

// @desc    Logout user & clear cookies
// @route   POST /api/v1/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Session ended. Logout successful.",
    data: null,
  });
});

// @desc    Refresh access token using refresh cookie
// @route   POST /api/v1/auth/refresh-token
// @access  Public
const refreshToken = asyncHandler(async (req, res, next) => {
  let token;

  // Extract refresh token from cookie or request body
  if (req.cookies && req.cookies.refreshToken) {
    token = req.cookies.refreshToken;
  } else if (req.body && req.body.refreshToken) {
    token = req.body.refreshToken;
  }

  if (!token) {
    return next(new ApiError(401, "Session expired. Refresh token missing."));
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch active user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ApiError(404, "Invalid session details. User not found."));
    }

    // Issue new tokens
    const tokens = generateTokens(user._id);
    setTokenCookies(res, tokens);

    res.status(200).json({
      success: true,
      message: "Session token refreshed.",
      data: {
        accessToken: tokens.accessToken,
      },
    });
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired session. Please sign in again."));
  }
});

// @desc    Generate password reset token
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    // Prevent email enumerations, return generic success even if not found in db
    return res.status(200).json({
      success: true,
      message: "If account exists, recovery link has been generated.",
      data: null,
    });
  }

  // Create a recovery token using signed short-expiry JWT (15 mins)
  const resetToken = jwt.sign(
    { id: user._id, type: "password-reset" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  // In production, send this via email services. For mock API:
  res.status(200).json({
    success: true,
    message: "If account exists, recovery link has been generated.",
    data: {
      resetToken, // Returned in mock data for frontend recovery testing
    },
  });
});

// @desc    Reset password using recovery token
// @route   POST /api/v1/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;

  try {
    // 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type !== "password-reset") {
      return next(new ApiError(400, "Invalid recovery token signature."));
    }

    // 2. Fetch user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ApiError(404, "User profile not found."));
    }

    // 3. Update password (will trigger pre-save bcrypt hook)
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully. Please login with your new credentials.",
      data: null,
    });
  } catch (error) {
    return next(new ApiError(400, "Expired or invalid password reset token."));
  }
});

// @desc    Get current authenticated user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "User session active.",
    data: {
      user: req.user,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
};
