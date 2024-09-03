const { PrismaClient, Role, UserStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.permissions.createMany({
      data: [
        // {
        //   name: "can read book",
        //   type: JSON.stringify({ action: "read", subject: "Book" }),
        // },
        // {
        //   name: "can rent book",
        //   type: JSON.stringify({ action: "create", subject: "Rent" }),
        // },
        {
          name: "can read all owners",
          type: JSON.stringify({ action: "read", subject: "User" }),
        },
      ],
    });

    console.log(" 🚀️ 🚀️ 🚀️ completed successfully.");
  } catch (error) {
    console.error("💥️ 💥️ 💥️ Error :", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
