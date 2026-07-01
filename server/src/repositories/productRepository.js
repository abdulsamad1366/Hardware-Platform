const Product = require("../models/Product");

class ProductRepository {
  // Create a new product document
  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  // Find a product by Mongoose ObjectId
  async findById(id) {
    return await Product.findById(id)
      .populate("manufacturer")
      .populate("category")
      .populate("collectionRef");
  }

  // Find a product by slug
  async findBySlug(slug) {
    return await Product.findOne({ slug: slug.toLowerCase() })
      .populate("manufacturer")
      .populate("category")
      .populate("collectionRef");
  }

  // Find a product by SKU
  async findBySku(sku) {
    return await Product.findOne({ sku: sku.toUpperCase() });
  }

  // Find products matching query, count totals, sort, and paginate
  async findAndCount(filterQuery, { sortQuery, skip, limit }) {
    const total = await Product.countDocuments(filterQuery);
    const products = await Product.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("manufacturer")
      .populate("category")
      .populate("collectionRef");

    return { products, total };
  }

  // Update a product by ID
  async update(id, updateData) {
    return await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("manufacturer")
      .populate("category")
      .populate("collectionRef");
  }

  // Delete a product by ID
  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  // Count products matching a specific query
  async count(filterQuery) {
    return await Product.countDocuments(filterQuery);
  }
}

module.exports = new ProductRepository();
