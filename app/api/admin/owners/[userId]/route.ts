import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    //FIXME:   !owner Id from req

    const { status } = await req.json();

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        user,
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: "An error occurred while update user.",
        status: 500,
      },
    });
  }
}
