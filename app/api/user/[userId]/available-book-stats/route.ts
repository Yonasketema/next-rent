/***
 *
 *  Owner
 *
 *   can(admin){
 *   stats of All book (app)
 *  }{
 *
 *  stats of a user(owner) book
 * }
 *
 *   - Available Books per catagories - pie chart
 *   - monthly Earning Summary - e.g . jul - 1000
 *                                     july -1020
 *   - monthly income the same - ? the last month of Earning Summary
 *
 */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAbility } from "@/lib/casl";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "read:stats",
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

    const user = await prisma.user.findFirst({
      where: {
        id: params.userId,
        approved: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        data: {
          error: true,
          message: "You are disable my the admin.contact the admin",
        },
      });
    }
    const bookStats = await prisma.book.groupBy({
      by: ["categoryId"],
      where: {
        status: "AVAILABLE",
        ownerId: params.userId,
        approved: true,
      },
      _count: {
        _all: true,
      },
    });

    const categories = await prisma.category.findMany({
      where: {
        id: { in: bookStats.map((stat) => stat.categoryId) },
      },
    });

    const categoryMap = Object.fromEntries(
      categories.map((cat) => [cat.id, cat.name])
    );

    const books = bookStats.map((stat) => ({
      id: stat.categoryId,
      category: categoryMap[stat.categoryId],
      count: stat._count._all,
    }));

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
