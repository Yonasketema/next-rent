import { createAbility } from "@/lib/casl";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "approve",
        "Book"
      )
    ) {
      return NextResponse.json({
        data: {
          error: true,
          message: "unauthorized",
          status: 401,
        },
      });
    }

    const { approved } = await req.json();

    console.table({ approved });

    const book = await prisma.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        approved: approved,
        status: approved ? "AVAILABLE" : "UNAVAILABLE",
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
