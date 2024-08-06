"use client";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import ToggleSwitch from "@/components/ToggleSwitch";
import { styled } from "@mui/material/styles";

const rows = [
  {
    id: 1,
    author: "Harry",
    owner: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: true,
  },
  {
    id: 1,
    author: "Harry",
    owner: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: true,
  },
  {
    id: 1,
    author: "Harry",
    owner: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: true,
  },
  {
    id: 1,
    author: "Harry",
    owner: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: true,
  },
  {
    id: 1,
    author: "Harry",
    owner: "Nardos T",
    category: "Fiction",
    bookName: "Derto Gada",
    status: true,
  },
];

const StyledTableCell = styled(TableCell)(({ theme, main }) => ({
  color: main ? "#1A1919" : "#656575",
  boxSizing: "border-box",
}));

export default function OwnerTable() {
  return (
    <TableContainer
      component={Box}
      sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell main>No.</StyledTableCell>
            <StyledTableCell main>Author</StyledTableCell>
            <StyledTableCell main>Owner</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Book Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <StyledTableCell main>{row.id}</StyledTableCell>
              <StyledTableCell main>{row.author}</StyledTableCell>
              <StyledTableCell main>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar />
                  {row.owner}
                </Box>
              </StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.bookName}</StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ToggleSwitch />
                </Box>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
