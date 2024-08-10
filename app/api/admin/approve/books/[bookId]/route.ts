import { ability } from "@/lib/casl";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
  
    const authUser = JSON.parse(req.headers.get('user') as string)

    if(!authUser || !ability(authUser).can('approve','Book')){

       
        return NextResponse.json({
          data: {
            error: true,
            message: "Unauthenticated",
            status: 401,
          },
        });
    }

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
