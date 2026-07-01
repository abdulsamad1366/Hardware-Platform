const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

// Cookie setter helper (part of the HTTP delivery layer)
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
  const { user, tokens } = await authService.registerUser(req.body);
  
  setTokenCookies(res, tokens);

  res.status(201).json({
    success: true,
    message: "Registration successful. Welcome to SecureLink.",
    data: {
      user,
      accessToken: tokens.accessToken,
    },
  });
});

// @desc    Authenticate user & get tokens
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.loginUser(email, password);

  setTokenCookies(res, tokens);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user,
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

  const tokens = await authService.refreshAccessToken(token);
  setTokenCookies(res, tokens);

  res.status(200).json({
    success: true,
    message: "Session token refreshed.",
    data: {
      accessToken: tokens.accessToken,
    },
  });
});

// @desc    Generate password reset token
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const resetToken = await authService.forgotPassword(email);

  // Return success response regardless of user existence (prevents email enumeration)
  res.status(200).json({
    success: true,
    message: "If account exists, recovery link has been generated.",
    data: resetToken ? { resetToken } : null,
  });
});

// @desc    Reset password using recovery token
// @route   POST /api/v1/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;
  await authService.resetPassword(token, password);

  res.status(200).json({
    success: true,
    message: "Password updated successfully. Please login with your new credentials.",
    data: null,
  });
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
