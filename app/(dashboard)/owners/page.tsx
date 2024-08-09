import React from "react";
import {
  Box,
} from "@mui/material";
import OwnerTable from "@/components/OwnerTable";

const Owners = async () => {
  let owners = await fetch("http://localhost:3000/api/admin/owners", {
    cache: "no-store",
  });

  owners = await owners.json();

  const data = owners.data.owners;

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
  
      <OwnerTable owners={data} />;
    </Box>
  );
};

export default Owners;
