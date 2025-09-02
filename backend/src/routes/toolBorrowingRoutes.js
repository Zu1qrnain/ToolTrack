import express from "express";
import {
  getToolBorrowings,
  getToolBorrowingById,
  createToolBorrowing,
  updateToolBorrowing,
  deleteToolBorrowing,
} from "../controllers/toolBorrowingController.js";

const router = express.Router();

router.get("/", getToolBorrowings);          // GET all borrowings
router.get("/:id", getToolBorrowingById);   // GET single borrowing by ID
router.post("/", createToolBorrowing);      // Create a borrowing
router.put("/:id", updateToolBorrowing);    // Update a borrowing
router.delete("/:id", deleteToolBorrowing); // Delete a borrowing

export default router;
