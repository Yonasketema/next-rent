import BookUploadPage from "@/components/UploadBook";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import prisma from "@/lib/prisma";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const user = await getCurrentSignInUserServer();

  if (user?.user?.role !== "OWNER")
    return redirect("/login?callbackUrl=/book-upload");

  const categories = await prisma.category.findMany();

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
      <BookUploadPage categories={categories} />
    </Box>
  );
}

export default page;
