
const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    dailyRate: {
      type: Number,
      required: true,
      min: 0
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number"
      }
    },

    condition: {
      type: String,
      enum: ["good", "maintenance", "damaged"],
      default: "good"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
