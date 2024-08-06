"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleSwitch from "@/components/ToggleSwitch";
import { styled } from "@mui/material/styles";
const rows = [
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approved",
  },
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approved",
  },
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approved",
  },
  {
    no: "01",
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
];

const StyledTableCell = styled(TableCell)(({ theme, main }) => ({
  color: main ? "#1A1919" : "#656575",
  boxSizing: "border-box",
}));

const OwnerTable = () => {
  return (
    <Box
      sx={{
        gap: 3,
        marginTop: 3,
        p: 2,
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" color="#222" fontSize={19}>
        List of Owner
      </Typography>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell main>No.</StyledTableCell>
            <StyledTableCell main>Owner</StyledTableCell>
            <StyledTableCell>Upload</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell main>{row.no}</StyledTableCell>
              <StyledTableCell
                main
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Avatar alt={row.owner} src="/static/images/avatar/1.jpg" />{" "}
                {row.owner}
              </StyledTableCell>
              <StyledTableCell>{row.upload}</StyledTableCell>
              <StyledTableCell>{row.location}</StyledTableCell>
              <StyledTableCell>
                <ToggleSwitch />
              </StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="view">
                  <VisibilityIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon sx={{ color: "red", marginRight: 7 }} />
                </IconButton>
                <Button
                  variant="contained"
                  color={row.action === "Approve" ? "primary" : "success"}
                  sx={{ minWidth: 120 }}
                >
                  {row.action}
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OwnerTable;
