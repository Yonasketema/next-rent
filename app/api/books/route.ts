 

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/zodSchemas";
import { ability } from "@/lib/casl";



export async function GET(req: Request) {

  try {
  const authUser = JSON.parse(req.headers.get('user') as string)
   

  if(!authUser || !ability(authUser)){
      return NextResponse.json({
        data: {
          error: true,
          message: "Unauthenticated",
          status: 401,
        },
      });
  }
    const books = await prisma.book.findMany({
      include: {
        category: true,
        owner: true,
      },
    });

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

export async function POST(req: Request) {
  // can(user role is owner and available)
  // FIXME: ownerId
  
  
  try {
    const authUser = JSON.parse(req.headers.get('user') as string)

    if(!authUser || !ability(authUser).can("create", "Book")){
    
       
        return NextResponse.json({
          data: {
            error: true,
            message: "Unauthenticated",
            status: 401,
          },
        });
    }
    const parsed = bookSchema.safeParse(await req.json());

    
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }
    const { title, author, categoryId, price, quantity } = parsed.data;
      



 
    const books = await prisma.book.create({
      data: {
        title,
        author,
        categoryId,
        ownerId:authUser.id,
        price,
        quantity,
      },
    });

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
        message: error.message,
        status: 500,
      },
    });
  }
}
