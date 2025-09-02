import express from "express";
import { getToolTransactions, createToolTransaction } from "../controllers/toolTransactionController.js";

const router = express.Router();

router.get("/", getToolTransactions);
router.post("/", createToolTransaction);

export default router;


