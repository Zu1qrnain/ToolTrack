// controllers/toolController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all tools
export const getTools = async (req, res) => {
  try {
    const tools = await prisma.tool.findMany();
    res.json(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tools" });
  }
};

// Get single tool by ID
export const getToolById = async (req, res) => {
  try {
    const { id } = req.params;
    const tool = await prisma.tool.findUnique({
      where: { id: Number(id) },
    });
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.json(tool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new tool
export const createTool = async (req, res) => {
  const { name, description, totalQuantity, categoryId, departmentId, serialNumber } = req.body;

  // First, check if categoryId and departmentId exist
  try {
    const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
    if (!category) return res.status(400).json({ error: "Invalid categoryId" });

    const department = await prisma.department.findUnique({ where: { id: Number(departmentId) } });
    if (!department) return res.status(400).json({ error: "Invalid departmentId" });

    // Create the tool
    const newTool = await prisma.tool.create({
      data: {
        name,
        description,
        totalQuantity,
        availableQuantity: totalQuantity, // all available initially
        minimumStockLevel: 1,
        status: "ACTIVE",
        condition: "GOOD",
        calibrationStatus: "VALID",
        serialNumber: serialNumber || null,
        categoryId: Number(categoryId),
        departmentId: Number(departmentId),
      },
    });

    res.status(201).json(newTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a tool
export const updateTool = async (req, res) => {
  const { id } = req.params;
  const { name, description, totalQuantity, categoryId, departmentId, minimumStockLevel } = req.body;

  try {
    const updatedTool = await prisma.tool.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        totalQuantity,
        availableQuantity: totalQuantity, // adjust availableQuantity
        minimumStockLevel: minimumStockLevel || 1,
        categoryId: Number(categoryId),
        departmentId: Number(departmentId),
      },
    });
    res.json(updatedTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a tool
export const deleteTool = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tool.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Tool deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete tool" });
  }
};
