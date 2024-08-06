"use client";
import React, { useState } from "react";
import { Switch, Typography, Box } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

const ToggleSwitch = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
