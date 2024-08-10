import React from "react";
import {
  Box,
} from "@mui/material";
import OwnerTable from "@/components/OwnerTable";
import { redirect } from "next/navigation";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { headers } from "next/headers";

const Owners = async () => {

  const user = await getCurrentSignInUserServer();
  
  if (user?.user?.role !== "ADMIN") return redirect("/login?callbackUrl=/dashboard");
  
  let owners = await fetch("http://localhost:3000/api/admin/owners", {
    headers:new Headers(headers()),
    cache: "no-store",
  });

  owners = await owners.json();

  const data = owners.data.owners;

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
  
      <OwnerTable owners={data} />
    </Box>
  );
};

export default Owners;
