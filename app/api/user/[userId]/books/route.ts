import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAbility } from "@/lib/casl";
import { filterQuery } from "@/lib/filterQuery";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "read",
        "Book"
      )
    ) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }

    const filters = filterQuery(req, "user");
    filters.ownerId = params.userId;

    const books = await prisma.book.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
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
