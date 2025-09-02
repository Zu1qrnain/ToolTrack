import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCalibrationRecords = async (req, res) => {
  try {
    const records = await prisma.calibrationRecord.findMany();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCalibrationRecord = async (req, res) => {
  try {
    const record = await prisma.calibrationRecord.create({ data: req.body });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
