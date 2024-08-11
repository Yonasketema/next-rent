/***
 *
 *  setting edit user profile
 *
 *
 *
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";
import { ability } from "@/lib/casl";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (!authUser || !ability(authUser).can("delete", "User")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }

    await prisma.user.delete({
      where: {
        id: params.userId,
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
