import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await prisma.category.create({ data: { name, description } });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
