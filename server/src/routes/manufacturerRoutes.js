const express = require("express");
const router = express.Router();

const {
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
  getManufacturerBySlug,
  getManufacturerById,
  listManufacturers,
} = require("../controllers/manufacturerController");

const {
  createManufacturerValidator,
  updateManufacturerValidator,
} = require("../validators/manufacturerValidator");

const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const uploadManufacturerFiles = require("../middleware/uploadManufacturerMiddleware");

// Configure upload fields mapping for detailed media and brochures
const manufacturerUpload = uploadManufacturerFiles.fields([
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "factoryImages", maxCount: 10 },
  { name: "companyBrochure", maxCount: 1 },
  { name: "factoryVideo", maxCount: 1 },
]);

// --- PUBLIC ROUTES ---
router.get("/", listManufacturers);
router.get("/slug/:slug", getManufacturerBySlug);
router.get("/:id", getManufacturerById);

// --- ADMIN SECURED ROUTES ---
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  manufacturerUpload,
  createManufacturerValidator,
  createManufacturer
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  manufacturerUpload,
  updateManufacturerValidator,
  updateManufacturer
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteManufacturer
);

module.exports = router;
