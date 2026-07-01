const ProductVariant = require("../models/ProductVariant");

class ProductVariantRepository {
  // Create a new product variant
  async create(variantData) {
    const variant = new ProductVariant(variantData);
    return await variant.save();
  }

  // Find a variant by Mongoose ObjectId
  async findById(id) {
    return await ProductVariant.findById(id).populate("product");
  }

  // Find a variant by SKU
  async findBySku(sku) {
    return await ProductVariant.findOne({ sku: sku.toUpperCase() });
  }

  // List product variants matching query, sort, and paginate
  async find(filterQuery, { sortQuery, skip, limit }) {
    return await ProductVariant.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("product");
  }

  // Update a variant by ID
  async update(id, updateData) {
    return await ProductVariant.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("product");
  }

  // Delete a variant by ID
  async delete(id) {
    return await ProductVariant.findByIdAndDelete(id);
  }

  // Count variants matching a specific query
  async count(filterQuery) {
    return await ProductVariant.countDocuments(filterQuery);
  }
}

module.exports = new ProductVariantRepository();
