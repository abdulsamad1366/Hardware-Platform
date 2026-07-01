const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Cart item product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Cart item quantity is required"],
      min: [1, "Quantity cannot be less than 1"],
      default: 1,
    },
  },
  {
    _id: false, // Prevents creating nested _id fields for subdocuments
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart user owner reference is required"],
      unique: true, // Ensures one cart per user
      index: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
