// src/routes/toolRoutes.js
import express from "express";
import {
  getTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool
} from "../controllers/toolController.js";

const router = express.Router();

// List all tools
router.get("/", getTools);

// Get single tool by ID
router.get("/:id", getToolById);

// Create a tool
router.post("/", createTool);

// Update a tool
router.put("/:id", updateTool);

// Delete a tool
router.delete("/:id", deleteTool);

export default router;
