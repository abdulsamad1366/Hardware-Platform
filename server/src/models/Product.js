const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Indicative price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category association is required"],
    },
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
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
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
