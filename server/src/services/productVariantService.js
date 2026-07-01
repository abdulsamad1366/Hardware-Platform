const fs = require("fs");
const path = require("path");
const productVariantRepository = require("../repositories/productVariantRepository");
const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");

// Safe filesystem deleter
const deleteLocalFile = (relativePath) => {
  if (!relativePath) return;
  try {
    const absolutePath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (err) {
    console.error(`[File System] Failed to delete file: ${relativePath}. Error: ${err.message}`);
  }
};

class ProductVariantService {
  // @desc    Create a new product variant
  async createVariant(reqBody, reqFiles) {
    const { product, sku } = reqBody;

    // 1. Verify parent product exists
    const parentProduct = await Product.findById(product);
    if (!parentProduct) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(404, "Parent product not found. Cannot associate variant.");
    }

    // 2. Verify unique SKU
    const skuExists = await productVariantRepository.findBySku(sku);
    if (skuExists) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(400, `A product variant with SKU '${sku}' already exists.`);
    }

    // 3. Map uploaded image paths
    const images = [];
    if (reqFiles && reqFiles.images) {
      reqFiles.images.forEach((file) => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    // 4. Construct DB variant data
    const variantData = {
      ...reqBody,
      images,
      moq: reqBody.moq ? parseInt(reqBody.moq, 10) : 1,
      price: parseFloat(reqBody.price),
    };

    return await productVariantRepository.create(variantData);
  }

  // @desc    Update an existing variant
  async updateVariant(id, reqBody, reqFiles) {
    const variant = await productVariantRepository.findById(id);
    if (!variant) {
      this.cleanupUploadedFiles(reqFiles);
      throw new ApiError(404, "Product variant not found.");
    }

    const updateData = { ...reqBody };

    // 1. Verify unique SKU if changed
    if (reqBody.sku && reqBody.sku.toUpperCase() !== variant.sku) {
      const skuExists = await productVariantRepository.findBySku(reqBody.sku);
      if (skuExists) {
        this.cleanupUploadedFiles(reqFiles);
        throw new ApiError(400, `A product variant with SKU '${reqBody.sku}' already exists.`);
      }
      updateData.sku = reqBody.sku.toUpperCase();
    }

    // 2. Process image updates and replace disk files
    if (reqFiles && reqFiles.images) {
      // Replace previous gallery with newly uploaded files
      variant.images.forEach((img) => deleteLocalFile(img));
      updateData.images = reqFiles.images.map((file) => `/uploads/${file.filename}`);
    }

    // 3. Handle removal of specific gallery images if instructed
    if (reqBody.removeImages) {
      const imagesToRemove = Array.isArray(reqBody.removeImages)
        ? reqBody.removeImages
        : reqBody.removeImages.split(",").map(i => i.trim());

      let currentGallery = updateData.images || variant.images;

      imagesToRemove.forEach((img) => {
        deleteLocalFile(img);
        currentGallery = currentGallery.filter((item) => item !== img);
      });

      updateData.images = currentGallery;
    }

    // Parse numeric fields
    if (reqBody.moq) updateData.moq = parseInt(reqBody.moq, 10);
    if (reqBody.price) updateData.price = parseFloat(reqBody.price);

    return await productVariantRepository.update(id, updateData);
  }

  // @desc    Delete a variant & clean up files
  async deleteVariant(id) {
    const variant = await productVariantRepository.findById(id);
    if (!variant) {
      throw new ApiError(404, "Product variant not found.");
    }

    // 1. Clear gallery images from filesystem disk
    variant.images.forEach((img) => deleteLocalFile(img));

    // 2. Delete document from DB
    await productVariantRepository.delete(id);
    return null;
  }

  // @desc    List product variants (filterable by product parent)
  async listVariants(queryParams) {
    const { product, status, availability, page = 1, limit = 10, sort } = queryParams;

    const filterQuery = {};

    // 1. Filter mapping
    if (product) filterQuery.product = product;
    if (status) filterQuery.status = status;
    if (availability) filterQuery.availability = availability;

    // 2. Sort config
    let sortQuery = { createdAt: -1 }; // Default
    if (sort) {
      if (sort === "Newest") sortQuery = { createdAt: -1 };
      else if (sort === "Oldest") sortQuery = { createdAt: 1 };
      else if (sort === "Price") sortQuery = { price: 1 };
      else if (sort === "-Price") sortQuery = { price: -1 };
    }

    // 3. Pagination
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // 4. Query execution
    const total = await productVariantRepository.count(filterQuery);
    const variants = await productVariantRepository.find(filterQuery, {
      sortQuery,
      skip,
      limit: limitNumber,
    });

    return {
      variants,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  }

  // Helper utility: cleans up uploaded files on error to prevent junk files leaking in storage
  cleanupUploadedFiles(reqFiles) {
    if (!reqFiles || !reqFiles.images) return;
    try {
      reqFiles.images.forEach((file) => {
        deleteLocalFile(`/uploads/${file.filename}`);
      });
    } catch (err) {
      console.error(`[Upload Cleanup] Failed to run file deletions: ${err.message}`);
    }
  }
}

module.exports = new ProductVariantService();
