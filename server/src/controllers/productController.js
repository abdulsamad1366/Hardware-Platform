const productService = require("../services/productService");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body, req.files);
  
  res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: { product },
  });
});

// @desc    Update an existing product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.files);

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: { product },
  });
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
    data: null,
  });
});

// @desc    Get product by slug
// @route   GET /api/v1/products/slug/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await productService.getProductBySlug(req.params.slug);

  res.status(200).json({
    success: true,
    message: "Product details retrieved.",
    data: { product },
  });
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product details retrieved.",
    data: { product },
  });
});

// @desc    List and search products (with filters & sorting)
// @route   GET /api/v1/products
// @access  Public
const listProducts = asyncHandler(async (req, res, next) => {
  const result = await productService.listProducts(req.query);

  res.status(200).json({
    success: true,
    message: "Products list retrieved successfully.",
    data: result,
  });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getProductById,
  listProducts,
};
