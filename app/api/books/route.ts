import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";
import { ability } from "@/lib/casl";
import { BookStatus } from "@prisma/client";

interface QueryParams {
  title?: any;
  price?: any;

  status?: BookStatus;
}

export async function GET(req: Request) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const status = searchParams.get("status") as BookStatus;

    const filters: QueryParams = {};

    if (title) {
      filters.title = { contains: title, mode: "insensitive" };
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (Number(minPrice)) {
        filters.price.gte = Number(minPrice);
      }
      if (Number(maxPrice)) {
        filters.price.lte = Number(maxPrice);
      }
    }
    if (status) {
      filters.status = status;
    }

    if (!authUser || !ability(authUser).can("read", "Book")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "unauthorized",
          status: 401,
        },
      });
    }
    const books = await prisma.book.findMany({
      where: filters,
      include: {
        category: true,
        owner: true,
      },
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

export async function POST(req: Request) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (!authUser || !ability(authUser).can("create", "Book")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "unauthorized",
          status: 401,
        },
      });
    }
    const parsed = bookSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 },
      );
    }
    const { title, author, categoryId, price, quantity } = parsed.data;

    const books = await prisma.book.create({
      data: {
        title,
        author,
        categoryId,
        ownerId: authUser.id,
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
