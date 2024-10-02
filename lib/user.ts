import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createUser({ email, location, phone, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        location,
        phone,
      },
    });

    return { user };
  } catch (error) {
    return { error: error.message };
  }
}
