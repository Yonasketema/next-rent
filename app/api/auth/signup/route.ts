import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, location, phone, password } = await req.json();

    const user = await prisma.user.create({
      data: {
        email,
        password,
        location,
        phone,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        user,
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: "An error occurred while registering the user.",
        status: 500,
      },
    });
  }
}
