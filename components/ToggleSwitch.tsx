"use client";
import React, { useState } from "react";
import { Switch, Typography, Box } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

type ToggleSwitchProps = {
  status: "ACTIVE" | "DISABLED";
  ownerId: string;
};

const ToggleSwitch = ({ status, ownerId }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(status === "ACTIVE");

  console.log("ss", status, ownerId);

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    await fetch(`http://localhost:3000/api/admin/owners/${ownerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !checked ? "ACTIVE" : "DISABLED",
      }),
    });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      px={1}
      borderRadius="16px"
      bgcolor={checked ? "rgba(0,128,0,0.1)" : "rgba(128,128,128,0.1)"}
      width="fit-content"
      sx={{
        width: 200,
      }}
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
        inputProps={{ "aria-label": "controlled", width: 200 }}
      />
    </Box>
  );
};

export default ToggleSwitch;
