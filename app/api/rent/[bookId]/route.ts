import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAbility } from "@/lib/casl";

export async function POST(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    const { searchParams } = new URL(req.url);

    const quantity = searchParams.get("quantity");

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "create",
        "Rent"
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

    const book = await prisma.book.findUnique({
      where: { id: params.bookId, approved: true },
      include: {
        owner: true,
      },
    });

    if (!book || book.status !== "AVAILABLE" || !book.owner.approved) {
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
        renterId: authUser.id,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month rental
        price: book.price,
      },
    });

    await prisma.income.create({
      data: {
        amount: book.price,
        ownerId: book.ownerId,
      },
    });

    await prisma.book.update({
      where: { id: params.bookId },
      data: {
        status: book.quantity - Number(quantity) === 0 ? "RENTED" : "AVAILABLE",
        quantity: book.quantity - Number(quantity),
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
        message: error.message,
        status: 500,
      },
    });
  }
}
