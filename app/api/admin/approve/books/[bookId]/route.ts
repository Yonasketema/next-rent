import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    //FIXME:   !can admin

    const { approved } = await req.json();

    const book = await prisma.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        approved: approved,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        book,
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
