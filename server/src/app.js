
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const equipmentRoutes = require("./routes/equipmentRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

// API Routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/reservations", reservationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "RentFlow API is running successfully!"
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting Express
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`RentFlow server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start RentFlow:", error.message);
    process.exit(1);
  }
};

startServer();
