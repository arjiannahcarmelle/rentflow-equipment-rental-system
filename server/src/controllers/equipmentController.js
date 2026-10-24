
const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");

// Allowed fields for creating and updating equipment
const allowedFields = [
  "name",
  "category",
  "description",
  "dailyRate",
  "totalQuantity",
  "condition"
];

const filterFields = (data) => {
  const filtered = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      filtered[field] = data[field];
    }
  }

  return filtered;
};

// GET /api/equipment
// Retrieve all active equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve equipment"
    });
  }
};

// GET /api/equipment/:id
// Retrieve one equipment record
exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid equipment ID"
      });
    }

    const equipment = await Equipment.findOne({
      _id: id,
      isActive: true
    });

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve equipment"
    });
  }
};

// POST /api/equipment
// Create new equipment
exports.createEquipment = async (req, res) => {
  try {
    const data = filterFields(req.body);

    const equipment = await Equipment.create(data);

    res.status(201).json({
      message: "Equipment created successfully",
      equipment
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid equipment data",
      error: error.message
    });
  }
};

// PUT /api/equipment/:id
// Update equipment details
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid equipment ID"
      });
    }

    const data = filterFields(req.body);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided"
      });
    }

    const equipment = await Equipment.findOneAndUpdate(
      { _id: id, isActive: true },
      { $set: data },
      {
        new: true,
        runValidators: true
      }
    );

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json({
      message: "Equipment updated successfully",
      equipment
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update equipment",
      error: error.message
    });
  }
};

// DELETE /api/equipment/:id
// Soft delete: deactivate equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid equipment ID"
      });
    }

    const equipment = await Equipment.findOneAndUpdate(
      { _id: id, isActive: true },
      { $set: { isActive: false } },
      { new: true }
    );

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.status(200).json({
      message: "Equipment deactivated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to deactivate equipment"
    });
  }
};
