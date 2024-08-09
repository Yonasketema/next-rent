"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";

const AppTableCell = styled(TableCell)(({ theme, main }) => ({
  color: main ? "#1A1919" : "#656575",
  boxSizing: "border-box",
}));

function StyledTableCell({ children, ...rest }) {
  return <AppTableCell {...rest}>{children}</AppTableCell>;
}

export default StyledTableCell;
