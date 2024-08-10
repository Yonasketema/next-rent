import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ability } from "@/lib/casl";
 

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {

    const authUser = JSON.parse(req.headers.get('user') as string)
    if(!authUser || !ability(authUser).can('read:income','Book')){

       
        return NextResponse.json({
          data: {
            error: true,
            message: "Unauthenticated",
            status: 401,
          },
        });
    }



    const user = await prisma.user.findFirst({
      where:{
        id:params.userId,
        approved:true
      }
    })

    if(!user){
      return NextResponse.json({
        data: {
          error: true,
          message: "You are disable my the admin.contact the admin",
         
        },
      });
    }
    const bookStats = await  prisma.book.groupBy({
      by: ['categoryId'],
      where: {
        status: 'AVAILABLE',
        ownerId:params.userId,
        approved:true
      },
      _count: {
        _all: true,
      },
    });

    
    const categories = await prisma.category.findMany({
      where: {
        id: { in: bookStats.map(stat => stat.categoryId) }
      }
    });

  
    const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat.name]));
  

    const books= bookStats.map(stat => ({
      id:stat.categoryId,
      category: categoryMap[stat.categoryId],
      count: stat._count._all,
    }));

    //FIXME:   !book return error 400

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
        message: "An error occurred while fetching books.",
        status: 500,
      },
    });
  }
}
