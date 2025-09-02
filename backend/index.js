// index.js
import express from "express";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./src/routes/userRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import toolRoutes from "./src/routes/toolRoutes.js";
import toolTransactionRoutes from "./src/routes/toolTransactionRoutes.js";
import toolBorrowingRoutes from "./src/routes/toolBorrowingRoutes.js";
import calibrationRoutes from "./src/routes/calibrationRoutes.js";
import maintenanceRoutes from "./src/routes/maintenanceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/tool-transactions", toolTransactionRoutes);
app.use("/api/tool-borrowings", toolBorrowingRoutes);
app.use("/api/calibrations", calibrationRoutes);
app.use("/api/maintenances", maintenanceRoutes);




// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Tool Tracking System API!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});

// adding comments
