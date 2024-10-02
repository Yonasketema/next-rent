import * as React from "react";
import { Box } from "@mui/material";
import prisma from "@/lib/prisma";
import BookTable from "@/components/BookTable";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";
import { getAllBook } from "@/lib/book";

async function getData() {
  const { books, error } = await getAllBook(null);
  if (!books || error) throw new Error("Failed to fetch books");

  return books;
}

export default async function Books() {
  const user = await getCurrentSignInUserServer();

  if (user?.user?.role !== "ADMIN")
    return redirect("/login?callbackUrl=/books");

  // let book = await fetch(createURL("/api/books"), {
  //   headers: new Headers(headers()),
  //   cache: "no-store",
  // });

  // book = await book.json();

  // const data = book?.data?.books;

  const book = await getData();

  const categories = await prisma.category.findMany();

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
      <BookTable books={book} categories={categories} />
    </Box>
  );
}
