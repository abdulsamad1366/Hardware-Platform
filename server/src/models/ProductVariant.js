const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Parent product reference is required"],
      index: true,
    },
    sku: {
      type: String,
      required: [true, "Variant SKU is required"],
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Variant name is required"], // e.g. "60mm Matte Black"
      trim: true,
    },
    material: {
      type: String,
      trim: true,
      default: "",
    },
    finish: {
      type: String,
      trim: true,
      default: "",
    },
    dimension: {
      type: String,
      trim: true,
      default: "",
    },
    weight: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Variant indicative price is required"],
      min: [0, "Variant price cannot be negative"],
    },
    moq: {
      type: Number,
      required: [true, "Variant MOQ is required"],
      min: [1, "Variant MOQ cannot be less than 1"],
      default: 1,
    },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Made to Order"],
      default: "In Stock",
      index: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.ProductVariant || mongoose.model("ProductVariant", productVariantSchema);
