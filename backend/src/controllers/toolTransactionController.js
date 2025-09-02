import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getToolTransactions = async (req, res) => {
  try {
    const transactions = await prisma.toolTransaction.findMany();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createToolTransaction = async (req, res) => {
  try {
    const transaction = await prisma.toolTransaction.create({ data: req.body });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
