import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  author: z.string().min(1, { message: "Author must not be empty" }),
  categoryId: z.string().min(1, { message: "Category ID must not be empty" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer" }),
});
