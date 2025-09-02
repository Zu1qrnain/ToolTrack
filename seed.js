// testSchema.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("===== Starting Prisma Schema Test =====");

  // 1. Create Departments
  const mechDept = await prisma.department.create({
    data: { name: "Mechanical", code: "MECH" },
  });
  const elecDept = await prisma.department.create({
    data: { name: "Electrical", code: "ELEC" },
  });
  console.log("Departments created:", mechDept.name, elecDept.name);

  // 2. Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "Ali Khan",
      email: "ali.khan@example.com",
      password: "password123",
      role: "EMPLOYEE",
      departmentId: mechDept.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      password: "password123",
      role: "TOOL_KEEPER",
      departmentId: mechDept.id,
    },
  });

  console.log("Users created:", user1.name, user2.name);

  // 3. Create Categories
  const wrenchCategory = await prisma.category.create({
    data: { name: "Wrenches", description: "Mechanical hand tools" },
  });
  const meterCategory = await prisma.category.create({
    data: { name: "Multimeters", description: "Electrical measuring tools" },
  });

  console.log("Categories created:", wrenchCategory.name, meterCategory.name);

  // 4. Create Tools
  const torqueWrench = await prisma.tool.create({
    data: {
      name: "Torque Wrench",
      totalQuantity: 5,
      availableQuantity: 5,
      departmentId: mechDept.id,
      categoryId: wrenchCategory.id,
      requiresCalibration: true,
      calibrationInterval: 180,
      lastCalibrationDate: new Date("2025-01-01"),
      nextCalibrationDate: new Date("2025-07-01"),
    },
  });

  const digitalMeter = await prisma.tool.create({
    data: {
      name: "Digital Multimeter",
      totalQuantity: 10,
      availableQuantity: 10,
      departmentId: elecDept.id,
      categoryId: meterCategory.id,
    },
  });

  console.log("Tools created:", torqueWrench.name, digitalMeter.name);

  // 5. Create a Tool Transaction (ISSUE)
  const transaction1 = await prisma.toolTransaction.create({
    data: {
      type: "ISSUE",
      quantity: 1,
      toolId: torqueWrench.id,
      userId: user1.id,
      notes: "Issued for maintenance task",
    },
  });

  console.log("ToolTransaction created:", transaction1.type, transaction1.id);

  // 6. Create a Tool Borrowing
  const borrowing1 = await prisma.toolBorrowing.create({
    data: {
      quantity: 1,
      toolId: torqueWrench.id,
      borrowerId: user1.id,
      expectedReturnDate: new Date("2025-09-05"),
      status: "BORROWED",
    },
  });

  console.log("ToolBorrowing created:", borrowing1.status);

  // 7. Create Calibration Record
  const calibration1 = await prisma.calibrationRecord.create({
    data: {
      calibrationDate: new Date("2025-01-01"),
      nextDueDate: new Date("2025-07-01"),
      calibratedBy: "Precision Calibrators Ltd",
      result: "PASS",
      toolId: torqueWrench.id,
      cost: 150.0,
    },
  });

  console.log("CalibrationRecord created:", calibration1.result);

  // 8. Create Maintenance Record
  const maintenance1 = await prisma.maintenanceRecord.create({
    data: {
      maintenanceDate: new Date("2025-02-01"),
      nextDueDate: new Date("2025-08-01"),
      maintenanceType: "Routine",
      performedBy: "Tech Services",
      description: "Checked torque settings and lubricated mechanism",
      toolId: torqueWrench.id,
      cost: 50.0,
    },
  });

  console.log("MaintenanceRecord created:", maintenance1.maintenanceType);

  console.log("===== Prisma Schema Test Completed Successfully =====");
}

main()
  .catch((e) => {
    console.error("Error during schema test:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
