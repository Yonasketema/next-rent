/**
 *
 *
 *
 *
 *
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";
import { getCurrentSignInUserServer } from "@/lib/authUser";

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        category: true,
        owner: true,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        books,
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: "An error occurred while fetching books.",
        status: 500,
      },
    });
  }
}

export async function POST(req: Request) {
  // can(user role is owner and available)
  // FIXME: ownerId
  const user = await getCurrentSignInUserServer();

  try {
    // const parsed = bookSchema.safeParse(await req.json());
    // if (!parsed.success) {
    //   return NextResponse.json(
    //     { message: parsed.error.message },
    //     { status: 400 }
    //   );
    // }
    const { title, author, categoryId, price, quantity, ownerId } =
      await req.json();

    const books = await prisma.book.create({
      data: {
        title,
        author,
        categoryId,
        ownerId,
        price,
        quantity,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        books,
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: error.message,
        status: 500,
      },
    });
  }
}
