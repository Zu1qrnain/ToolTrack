import express from "express";
import { getMaintenanceRecords, createMaintenanceRecord } from "../controllers/maintenanceController.js";

const router = express.Router();

router.get("/", getMaintenanceRecords);
router.post("/", createMaintenanceRecord);

export default router;
