const productVariantService = require("../services/productVariantService");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a new product variant
// @route   POST /api/v1/variants
// @access  Private/Admin
const createVariant = asyncHandler(async (req, res, next) => {
  const variant = await productVariantService.createVariant(req.body, req.files);

  res.status(201).json({
    success: true,
    message: "Product variant created successfully.",
    data: { variant },
  });
});

// @desc    Update an existing variant
// @route   PUT /api/v1/variants/:id
// @access  Private/Admin
const updateVariant = asyncHandler(async (req, res, next) => {
  const variant = await productVariantService.updateVariant(req.params.id, req.body, req.files);

  res.status(200).json({
    success: true,
    message: "Product variant updated successfully.",
    data: { variant },
  });
});

// @desc    Delete a variant & clean up files
// @route   DELETE /api/v1/variants/:id
// @access  Private/Admin
const deleteVariant = asyncHandler(async (req, res, next) => {
  await productVariantService.deleteVariant(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product variant deleted successfully.",
    data: null,
  });
});

// @desc    List and search variants
// @route   GET /api/v1/variants
// @access  Public
const listVariants = asyncHandler(async (req, res, next) => {
  const result = await productVariantService.listVariants(req.query);

  res.status(200).json({
    success: true,
    message: "Product variants list retrieved successfully.",
    data: result,
  });
});

module.exports = {
  createVariant,
  updateVariant,
  deleteVariant,
  listVariants,
};
