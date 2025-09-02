import express from "express";
import { getCalibrationRecords, createCalibrationRecord } from "../controllers/calibrationController.js";

const router = express.Router();

router.get("/", getCalibrationRecords);
router.post("/", createCalibrationRecord);

export default router;
