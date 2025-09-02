import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);          // Get all users
router.get("/:id", getUserById);   // Get a user by ID
router.post("/", createUser);       // Create a new user
router.put("/:id", updateUser);    // Update a user
router.delete("/:id", deleteUser); // Delete a user

export default router;
