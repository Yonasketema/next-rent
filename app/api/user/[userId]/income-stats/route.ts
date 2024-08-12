import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ability } from "@/lib/casl";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const monthlyIncome = await prisma.income.groupBy({
      by: ["createdAt"],
      where: {
        ownerId: params.userId,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const formattedData = monthlyIncome.reduce((acc, curr) => {
      const month = curr.createdAt.toISOString().slice(0, 7); // Get 'YYYY-MM' format
      if (!acc[month]) {
        acc[month] = {
          month,
          total_income: 0,
        };
      }
      acc[month].total_income += curr._sum.amount;
      return acc;
    }, {});

    // Convert the object back to an array

    return NextResponse.json({
      data: {
        error: false,
        income: Object.values(formattedData),
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
