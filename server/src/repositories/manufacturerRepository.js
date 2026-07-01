const Manufacturer = require("../models/Manufacturer");

class ManufacturerRepository {
  // Create a new manufacturer document
  async create(manufacturerData) {
    const manufacturer = new Manufacturer(manufacturerData);
    return await manufacturer.save();
  }

  // Find a manufacturer by ID
  async findById(id) {
    return await Manufacturer.findById(id)
      .populate("collections")
      .populate("products")
      .populate("productsCount");
  }

  // Find a manufacturer by slug
  async findBySlug(slug) {
    return await Manufacturer.findOne({ slug: slug.toLowerCase() })
      .populate("collections")
      .populate("products")
      .populate("productsCount");
  }

  // Find a manufacturer by email
  async findByEmail(email) {
    return await Manufacturer.findOne({ email: email.toLowerCase() });
  }

  // Find a manufacturer by GST
  async findByGst(gst) {
    return await Manufacturer.findOne({ gst: gst.toUpperCase() });
  }

  // Find manufacturers matching query, count totals, sort, and paginate
  async findAndCount(filterQuery, { sortQuery, skip, limit }) {
    const total = await Manufacturer.countDocuments(filterQuery);
    const manufacturers = await Manufacturer.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("productsCount"); // Keeps query fast in list view

    return { manufacturers, total };
  }

  // Update a manufacturer by ID
  async update(id, updateData) {
    return await Manufacturer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate("collections")
      .populate("products")
      .populate("productsCount");
  }

  // Delete a manufacturer by ID
  async delete(id) {
    return await Manufacturer.findByIdAndDelete(id);
  }

  // Count manufacturers matching query
  async count(filterQuery) {
    return await Manufacturer.countDocuments(filterQuery);
  }
}

module.exports = new ManufacturerRepository();
