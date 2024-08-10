import { ability } from "@/lib/casl";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    
    const authUser = JSON.parse(req.headers.get('user') as string)

    if(!authUser || !ability(authUser).can('approve','User')){
    
       
        return NextResponse.json({
          data: {
            error: true,
            message: "Unauthenticated",
            status: 401,
          },
        });
    }
    const { approved } = await req.json();

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        approved: approved,
        role: "OWNER",
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
        message: error.message,
        status: 500,
      },
    });
  }
}
