/***
 *
 *  TODO: setting ,edit user profile , get user rented book
 *
 *
 *
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";
import { createAbility } from "@/lib/casl";
import { subject } from "@casl/ability";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "delete",
        subject("User", { id: params.userId })
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

    await prisma.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json({ data: { error: false } });
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
