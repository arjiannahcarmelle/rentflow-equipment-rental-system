
const mongoose = require("mongoose");

const reservationItemSchema = new mongoose.Schema(
  {
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number"
      }
    },

    dailyRate: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [reservationItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "At least one equipment item is required"
      }
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
        "checked_out",
        "returned"
      ],
      default: "pending"
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

reservationSchema.path("endDate").validate(function (value) {
  return this.startDate && value >= this.startDate;
}, "End date must not be earlier than start date");

module.exports = mongoose.model(
  "Reservation",
  reservationSchema
);
