"use client";
import React, { useState } from "react";
import { Switch, Typography, Box } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import { createURL } from "@/lib/api";
import { useRouter } from "next/navigation";

type ToggleSwitchProps = {
  status: "ACTIVE" | "DISABLED";
  ownerId: string;
};

const ToggleSwitch = ({ status, ownerId }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(status === "ACTIVE");
  const router = useRouter();

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    await fetch(createURL(`/api/admin/owners/${ownerId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !checked ? "ACTIVE" : "DISABLED",
      }),
    });
    router.refresh();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      px={1}
      borderRadius="16px"
      bgcolor={checked ? "rgba(0,128,0,0.1)" : "rgba(128,128,128,0.1)"}
      width="fit-content"
    >
      <CheckIcon style={{ color: checked ? "green" : "gray" }} />
      <Typography
        variant="body1"
        style={{
          color: checked ? "green" : "gray",
          marginLeft: "8px",
          marginRight: "8px",
        }}
      >
        {checked ? "Active" : "Inactive"}
      </Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        color="success"
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};

export default ToggleSwitch;
