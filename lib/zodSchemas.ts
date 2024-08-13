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

export const bookUpdateSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]),
});

export const loginSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    location: z.string().min(2, "Location must be at least 2 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
