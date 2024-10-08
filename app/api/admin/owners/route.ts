/**
 *  get all owner : can('admin')
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAbility } from "@/lib/casl";
import { filterQuery } from "@/lib/filterQuery";
import { OWNER_ROLE_ID } from "@/lib/var";

export async function GET(req: Request) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "read",
        "User"
      )
    ) {
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
    }
    const filters = filterQuery(req, "User");
    filters.roleId = OWNER_ROLE_ID;

    const owners = await prisma.user.findMany({
      where: {
        roleId: 1,
      },
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
