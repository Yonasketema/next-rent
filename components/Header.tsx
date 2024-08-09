"use client";
import React from "react";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Header() {
  const session = useSession();
  const pathName = usePathname();

  return (
    <>
      <Typography
        variant="h6"
        color="#1A1919"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {session.status !== "loading" && session.data?.user.role}
      </Typography>
      <Typography variant="h6" color="gray" textTransform="capitalize">
        {pathName}
      </Typography>
    </>
  );
}

export default Header;
