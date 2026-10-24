
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const Equipment = require("../models/Equipment");
const User = require("../models/User");

const validId = (id) => mongoose.isValidObjectId(id);

const populateReservation = (query) =>
  query
    .populate("customer", "fullName email")
    .populate("items.equipment", "name category dailyRate");

// GET /api/reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await populateReservation(
      Reservation.find().sort({ createdAt: -1 })
    );

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve reservations"
    });
  }
};

// GET /api/reservations/:id
exports.getReservationById = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid reservation ID"
      });
    }

    const reservation = await populateReservation(
      Reservation.findById(req.params.id)
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve reservation"
    });
  }
};

// POST /api/reservations
exports.createReservation = async (req, res) => {
  try {
    const {
      customer,
      items,
      startDate,
      endDate,
      notes
    } = req.body;

    if (!validId(customer)) {
      return res.status(400).json({
        message: "Invalid customer ID"
      });
    }

    const user = await User.findOne({
      _id: customer,
      role: "customer",
      isActive: true
    });

    if (!user) {
      return res.status(404).json({
        message: "Active customer not found"
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      !startDate ||
      !endDate ||
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end < start
    ) {
      return res.status(400).json({
        message: "Invalid rental dates"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one equipment item is required"
      });
    }

    const uniqueIds = new Set();
    const reservationItems = [];

    for (const item of items) {
      if (
        !validId(item.equipment) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid equipment or quantity"
        });
      }

      const id = String(item.equipment);

      if (uniqueIds.has(id)) {
        return res.status(400).json({
          message: "Duplicate equipment items are not allowed"
        });
      }

      uniqueIds.add(id);

      const equipment = await Equipment.findOne({
        _id: id,
        isActive: true,
        condition: "good"
      });

      if (!equipment) {
        return res.status(404).json({
          message: "Available equipment record not found"
        });
      }

      if (item.quantity > equipment.totalQuantity) {
        return res.status(400).json({
          message: `Quantity exceeds inventory for ${equipment.name}`
        });
      }

      reservationItems.push({
        equipment: equipment._id,
        quantity: item.quantity,
        dailyRate: equipment.dailyRate
      });
    }

    // Inclusive calendar-day rental calculation
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const rentalDays =
      Math.floor(
        (Date.UTC(
          end.getUTCFullYear(),
          end.getUTCMonth(),
          end.getUTCDate()
        ) -
          Date.UTC(
            start.getUTCFullYear(),
            start.getUTCMonth(),
            start.getUTCDate()
          )) / MS_PER_DAY
      ) + 1;

    const totalAmount = reservationItems.reduce(
      (sum, item) =>
        sum + item.dailyRate * item.quantity * rentalDays,
      0
    );

    const reservation = await Reservation.create({
      customer,
      items: reservationItems,
      startDate: start,
      endDate: end,
      notes,
      totalAmount
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create reservation",
      error: error.message
    });
  }
};

// PATCH /api/reservations/:id
// Development-only status updates
exports.updateReservation = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid reservation ID"
      });
    }

    const allowedStatuses = [
      "approved",
      "rejected",
      "cancelled",
      "checked_out",
      "returned"
    ];

    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid reservation status"
      });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update reservation"
    });
  }
};

// DELETE /api/reservations/:id
// Cancel rather than permanently delete
exports.cancelReservation = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid reservation ID"
      });
    }

    const reservation = await Reservation.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "pending"
      },
      { $set: { status: "cancelled" } },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Pending reservation not found"
      });
    }

    res.status(200).json({
      message: "Reservation cancelled successfully",
      reservation
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel reservation"
    });
  }
};
