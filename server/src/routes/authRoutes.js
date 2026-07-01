const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/authValidator");

const { authenticateUser } = require("../middleware/authMiddleware");

// Authentication Route Configurations
router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.post("/logout", authenticateUser, logoutUser);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPasswordValidator, forgotPassword);
router.post("/reset-password", resetPasswordValidator, resetPassword);
router.get("/me", authenticateUser, getMe);

module.exports = router;
