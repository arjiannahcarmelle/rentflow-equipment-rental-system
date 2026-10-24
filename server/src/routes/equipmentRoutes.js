
const express = require("express");
const router = express.Router();

const equipmentController = require(
  "../controllers/equipmentController"
);

// Read equipment
router.get("/", equipmentController.getAllEquipment);
router.get("/:id", equipmentController.getEquipmentById);

// Create equipment
router.post("/", equipmentController.createEquipment);

// Update equipment
router.put("/:id", equipmentController.updateEquipment);

// Deactivate equipment
router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
