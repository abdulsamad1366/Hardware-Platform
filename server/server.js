// Load dotenv configurations before any other module imports
require("dotenv").config({ path: "./.env" });

const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Listen to uncaught exceptions for safety
process.on("uncaughtException", (err) => {
  console.error(`[Server] Uncaught Exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});

// Establish database connection and start HTTP server
const startServer = async () => {
  try {
    // 1. Connect MongoDB
    await connectDB();

    // 2. Start Express HTTP Server Listener
    const server = app.listen(PORT, () => {
      console.log(`[Server] SecureLink active in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Listen to unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error(`[Server] Unhandled Rejection: ${err.message}`);
      console.error(err.stack);
      
      // Graceful server shutdown
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    console.error(`[Server] Failed to initialize backend: ${error.message}`);
    process.exit(1);
  }
};

startServer();
