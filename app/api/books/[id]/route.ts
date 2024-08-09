/**
 *
 *  GET id
 *  PUT id
 *  DELETE id
 *
 *  patch id admin approve
 *
 *
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const books = await prisma.book.findMany({
      where: {
        id: params.id,
      },
    });

    //FIXME:   !book return error 400

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const parsed = bookSchema.safeParse(await req.json());

    //FIXME:   !owner Id from req

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }

    const { title, author, categoryId, price, quantity } = parsed.data;

    const books = await prisma.book.update({
      where: {
        id: params.id,
        ownerId: "clzjwjsny0000xwfcq2s7fw9y",
      },
      data: { title, author, categoryId, price, quantity },
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
        message: "An error occurred while update books.",
        status: 500,
      },
    });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //FIXME:   !owner Id from req

    await prisma.book.delete({
      where: {
        id: params.id,
        ownerId: "clzjwjsny0000xwfcq2s7fw9y",
      },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: "An error occurred while delete books.",
        status: 500,
      },
    });
  }
}
