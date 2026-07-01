const manufacturerService = require("../services/manufacturerService");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a new manufacturer profile
// @route   POST /api/v1/manufacturers
// @access  Private/Admin
const createManufacturer = asyncHandler(async (req, res, next) => {
  const manufacturer = await manufacturerService.createManufacturer(req.body, req.files);

  res.status(201).json({
    success: true,
    message: "Manufacturer profile created successfully.",
    data: { manufacturer },
  });
});

// @desc    Update manufacturer details
// @route   PUT /api/v1/manufacturers/:id
// @access  Private/Admin
const updateManufacturer = asyncHandler(async (req, res, next) => {
  const manufacturer = await manufacturerService.updateManufacturer(req.params.id, req.body, req.files);

  res.status(200).json({
    success: true,
    message: "Manufacturer profile updated successfully.",
    data: { manufacturer },
  });
});

// @desc    Delete manufacturer & clear related files
// @route   DELETE /api/v1/manufacturers/:id
// @access  Private/Admin
const deleteManufacturer = asyncHandler(async (req, res, next) => {
  await manufacturerService.deleteManufacturer(req.params.id);

  res.status(200).json({
    success: true,
    message: "Manufacturer profile deleted successfully.",
    data: null,
  });
});

// @desc    Get manufacturer by slug
// @route   GET /api/v1/manufacturers/slug/:slug
// @access  Public
const getManufacturerBySlug = asyncHandler(async (req, res, next) => {
  const manufacturer = await manufacturerService.getManufacturerBySlug(req.params.slug);

  res.status(200).json({
    success: true,
    message: "Manufacturer details retrieved.",
    data: { manufacturer },
  });
});

// @desc    Get manufacturer by ID
// @route   GET /api/v1/manufacturers/:id
// @access  Public
const getManufacturerById = asyncHandler(async (req, res, next) => {
  const manufacturer = await manufacturerService.getManufacturerById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Manufacturer details retrieved.",
    data: { manufacturer },
  });
});

// @desc    List, search and filter manufacturers
// @route   GET /api/v1/manufacturers
// @access  Public
const listManufacturers = asyncHandler(async (req, res, next) => {
  const result = await manufacturerService.listManufacturers(req.query);

  res.status(200).json({
    success: true,
    message: "Manufacturers list retrieved successfully.",
    data: result,
  });
});

module.exports = {
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
  getManufacturerBySlug,
  getManufacturerById,
  listManufacturers,
};
