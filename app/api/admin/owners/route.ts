/**
 *  get all owner : can('admin')
 *
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // FIXME:  user must role admin
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
