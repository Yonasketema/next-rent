import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAbility } from "@/lib/casl";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const authUser = JSON.parse(req.headers.get("user") as string);

    if (
      !authUser ||
      !createAbility(authUser.role.permissions, { user: authUser }).can(
        "request-approval",
        "User"
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
    const data = await req.json();

    await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: data.image || "",
      },
    });

    await prisma.approvalRequest.create({
      data: {
        userId: params.userId,
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
