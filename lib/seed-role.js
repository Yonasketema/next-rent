const { PrismaClient, Role, UserStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.permissions.createMany({
      data: [
        {
          name: "USER",
          permissions: JSON.stringify([
            { action: "read", subject: "Book" },
            { action: "create", subject: "Rent" },
            { action: "request-approval", subject: "User" },
          ]),
        },
        {
          name: "OWNER",
          permissions: JSON.stringify([
            { action: "read", subject: "Book" },
            { action: "create", subject: "Rent" },
            { action: "request-approval", subject: "User" },
            { action: "read:stats", subject: "Book" },
            { action: "read:income", subject: "Book" },
            {
              action: "update",
              subject: "Book",
              conditions: { ownerId: "{{user.id}}" },
            },
            { action: "create", subject: "Book" },
            {
              action: "delete",
              subject: "User",
              conditions: { id: "{{user.id}}" },
            },
            { action: "delete", subject: "Book" },
          ]),
        },
        {
          name: "ADMIN",
          permissions: JSON.stringify([{ action: "manage", subject: "all" }]),
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
