"use client";
import React from "react";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
 

function Header({role}:{role:string}) {
  
  const pathName = usePathname();

  return (
    <>
      <Typography
        variant="h6"
        color="#1A1919"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {role.toLocaleLowerCase()}
      </Typography>
      <Typography variant="h6" color="gray" textTransform="capitalize">
        {pathName}
      </Typography>
    </>
  );
}

export default Header;
