import { BookStatus } from "@prisma/client";

export const filterQuery = (req: Request, type?: string) => {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const author = searchParams.get("author");
  const owner = searchParams.get("owner");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const status = searchParams.get("status") as BookStatus;

  const filters: any = {};

  if (title) {
    filters.title = { contains: title, mode: "insensitive" };
  }
  if (minPrice || maxPrice) {
    filters.price = {};
    if (Number(minPrice)) {
      filters.price.gte = Number(minPrice);
    }
    if (Number(maxPrice)) {
      filters.price.lte = Number(maxPrice);
    }
  }
  if (status) {
    filters.status = status;
  }

  // admin get books

  if (author) filters.author = { contains: author, mode: "insensitive" };

  if (owner && type !== "user")
    filters.owner = { name: { contains: owner, mode: "insensitive" } };
  if (owner && type === "user")
    filters.name = { contains: owner, mode: "insensitive" };
  if (category) filters.categoryId = category;
  if (category) filters.categoryId = category;
  if (location) filters.location = { contains: location, mode: "insensitive" };

  return filters;
};
