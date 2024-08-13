import React from "react";
import { Box } from "@mui/material";
import OwnerTable from "@/components/OwnerTable";
import { redirect } from "next/navigation";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";

const Owners = async () => {
  const user = await getCurrentSignInUserServer();

  if (user?.user?.role !== "ADMIN")
    return redirect("/login?callbackUrl=/owners");

  let owners = await fetch(createURL("/api/admin/owners"), {
    headers: new Headers(headers()),
    cache: "no-store",
  });

  owners = await owners.json();

  const data = owners.data.owners;

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
      <OwnerTable owners={data} title=" List of Owner" />
    </Box>
  );
};

export default Owners;
