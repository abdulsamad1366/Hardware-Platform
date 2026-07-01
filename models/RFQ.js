const mongoose = require("mongoose");

const rfqItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "RFQ item product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "RFQ item quantity is required"],
      min: [1, "Quantity cannot be less than 1"],
    },
    estimatedPrice: {
      type: Number,
      required: [true, "RFQ item estimated price is required"],
      min: [0, "Estimated price cannot be negative"],
    },
  },
  {
    _id: false,
  }
);

const rfqSchema = new mongoose.Schema(
  {
    rfqNumber: {
      type: String,
      required: [true, "RFQ number tracking identifier is required"],
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "RFQ user owner reference is required"],
      index: true,
    },
    companyInfo: {
      company: {
        type: String,
        required: [true, "RFQ company name is required"],
        trim: true,
      },
      contactPerson: {
        type: String,
        required: [true, "RFQ contact name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "RFQ contact email is required"],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      },
      phone: {
        type: String,
        required: [true, "RFQ contact phone is required"],
        trim: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
      },
      gst: {
        type: String,
        trim: true,
        uppercase: true,
        default: "",
      },
      city: {
        type: String,
        required: [true, "RFQ city is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "RFQ state is required"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "RFQ country is required"],
        trim: true,
        default: "India",
      },
    },
    projectInfo: {
      projectName: {
        type: String,
        trim: true,
        default: "",
      },
      projectType: {
        type: String,
        enum: ["Residential", "Commercial", "Hospitality", "Industrial", "Healthcare", "Education", "Government"],
        default: "Commercial",
      },
      deliveryDate: {
        type: Date,
        default: null,
      },
      budget: {
        type: String,
        trim: true,
        default: "",
      },
    },
    items: {
      type: [rfqItemSchema],
      validate: [
        (val) => val.length > 0,
        "An RFQ must contain at least one selected product",
      ],
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected"],
      default: "Pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.RFQ || mongoose.model("RFQ", rfqSchema);
