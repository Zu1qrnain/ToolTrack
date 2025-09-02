import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all borrowings
export const getToolBorrowings = async (req, res) => {
  try {
    const borrowings = await prisma.toolBorrowing.findMany({
      include: { tool: true, borrower: true },
    });
    res.json(borrowings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single borrowing
export const getToolBorrowingById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowing = await prisma.toolBorrowing.findUnique({
      where: { id: Number(id) },
      include: { tool: true, borrower: true },
    });
    if (!borrowing) return res.status(404).json({ message: "Borrowing not found" });
    res.json(borrowing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Create a borrowing
export const createToolBorrowing = async (req, res) => {
  try {
    const { toolId, borrowerId, quantity, expectedReturnDate, notes } = req.body;

    const tool = await prisma.tool.findUnique({ where: { id: Number(toolId) } });
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    if (tool.availableQuantity < quantity) return res.status(400).json({ message: "Not enough tools available" });

    const borrowing = await prisma.toolBorrowing.create({
      data: {
        toolId: Number(toolId),
        borrowerId: Number(borrowerId),
        quantity,
        expectedReturnDate: new Date(expectedReturnDate),
        notes,
      },
    });

    // Reduce tool availability
    await prisma.tool.update({
      where: { id: Number(toolId) },
      data: { availableQuantity: tool.availableQuantity - quantity },
    });

    res.status(201).json(borrowing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a borrowing
export const updateToolBorrowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, expectedReturnDate, actualReturnDate, status, notes } = req.body;

    const borrowing = await prisma.toolBorrowing.findUnique({ where: { id: Number(id) } });
    if (!borrowing) return res.status(404).json({ message: "Borrowing not found" });

    // Update tool availability if quantity changes
    if (quantity && quantity !== borrowing.quantity) {
      const tool = await prisma.tool.findUnique({ where: { id: borrowing.toolId } });
      const diff = quantity - borrowing.quantity;
      if (diff > 0 && tool.availableQuantity < diff) return res.status(400).json({ message: "Not enough tools available" });

      await prisma.tool.update({
        where: { id: tool.id },
        data: { availableQuantity: tool.availableQuantity - diff },
      });
    }

    const updated = await prisma.toolBorrowing.update({
      where: { id: Number(id) },
      data: {
        quantity: quantity ?? borrowing.quantity,
        expectedReturnDate: expectedReturnDate ? new Date(expectedReturnDate) : borrowing.expectedReturnDate,
        actualReturnDate: actualReturnDate ? new Date(actualReturnDate) : borrowing.actualReturnDate,
        status: status ?? borrowing.status,
        notes: notes ?? borrowing.notes,
      },
    });

    // Increase availability if returned
    if (status === "RETURNED" && !borrowing.actualReturnDate) {
      await prisma.tool.update({
        where: { id: borrowing.toolId },
        data: { availableQuantity: { increment: updated.quantity } },
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a borrowing
export const deleteToolBorrowing = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowing = await prisma.toolBorrowing.findUnique({ where: { id: Number(id) } });
    if (!borrowing) return res.status(404).json({ message: "Borrowing not found" });

    // Return tools before deleting
    await prisma.tool.update({
      where: { id: borrowing.toolId },
      data: { availableQuantity: { increment: borrowing.quantity } },
    });

    await prisma.toolBorrowing.delete({ where: { id: Number(id) } });
    res.json({ message: "Borrowing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
