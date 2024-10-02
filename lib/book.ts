import prisma from "./prisma";


export async function getAllBook(filters) {
  try {
    const books = await prisma.book.findMany({
      where: filters,
      include: {
        category: true,
        owner: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      books,
    };
  } catch (error) {
    return { error: "Failed to fetch books!" };
  }
}