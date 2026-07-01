const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");

// Mounting versioned auth sub-routers
router.use("/auth", authRoutes);

// Base health check status endpoint
router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SecureLink B2B Procurement API Server is active",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
