/**
 *  get all owner : can('admin')
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ability } from "@/lib/casl";

export async function GET(req: Request) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (!authUser || !ability(authUser).can("read", "User")) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }
    const owners = await prisma.user.findMany({
      where: {
        role: "OWNER",
      },
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: {
        error: false,
        owners,
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        error: true,
        message: "An error occurred while fetching.",
        status: 500,
      },
    });
  }
}
