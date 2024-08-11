import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema, bookUpdateSchema } from "@/lib/zodSchemas";
import { ability } from "@/lib/casl";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const book = await prisma.book.findMany({
      where: {
        id: params.id,
      },
    });

    if (!book) {
      return NextResponse.json({
        data: {
          error: true,
          message: "no book found",
          status: 404,
        },
      });
    }

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
        message: "An error occurred while fetching book.",
        status: 500,
      },
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const parsed = bookUpdateSchema.safeParse(await req.json());

    //FIXME:   !owner Id from req
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (!authUser || !ability(authUser).can("update", "Book")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 },
      );
    }

    const { title, status, price } = parsed.data;

    const books = await prisma.book.update({
      where: {
        id: params.id,
        ownerId: authUser?.id,
      },
      data: { title, status, price },
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
  { params }: { params: { id: string } },
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (!authUser || !ability(authUser).can("delete", "Book")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }

    await prisma.book.delete({
      where: {
        id: params.id,
        ownerId: authUser.id,
      },
    });

    return NextResponse.json({});
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
