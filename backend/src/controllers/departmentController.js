import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;
    const dept = await prisma.department.create({ data: { name, code } });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
