import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";

export async function POST(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    //FIXME:   role user , userId   ??? status code

    const book = await prisma.book.findUnique({
      where: { id: params.bookId },
    });

    if (!book || book.status !== "AVAILABLE") {
      return NextResponse.json({
        data: {
          error: true,
          message: "book unavailable",
          status: 500,
        },
      });
    }

    await prisma.rent.create({
      data: {
        bookId: params.bookId,
        renterId: "clzjwjsny0000xwfcq2s7fw9y",
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month rental
        price: book.price,
      },
    });

    const rent = await prisma.book.update({
      where: { id: params.bookId },
      data: {
        status: book.quantity - 1 === 0 ? "RENTED" : "AVAILABLE",
        quantity: book.quantity - 1,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
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
