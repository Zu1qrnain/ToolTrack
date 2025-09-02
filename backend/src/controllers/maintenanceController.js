import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMaintenanceRecords = async (req, res) => {
  try {
    const records = await prisma.maintenanceRecord.findMany();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMaintenanceRecord = async (req, res) => {
  try {
    const record = await prisma.maintenanceRecord.create({ data: req.body });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
