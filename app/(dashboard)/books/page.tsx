import * as React from "react";
import {
  Box,
} from "@mui/material";
import BookTable from "@/components/BookTable";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";

export default async function Books() {

  const user = await getCurrentSignInUserServer();
  
  if (user?.user?.role !== "ADMIN") return redirect("/login?callbackUrl=/dashboard");

  let book = await fetch(createURL('/api/books'), {
    headers:new Headers(headers()),
    cache: "no-store",
  });

  

  book = await book.json();

  const data = book?.data?.books;

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
    
      <BookTable books={data} />
    </Box>
  );
}
 