import * as React from "react";
import {
  Box,
} from "@mui/material";
import BookTable from "@/components/BookTable";

export default async function Books() {
  let book = await fetch(`http://localhost:3000/api/books`, {
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
 