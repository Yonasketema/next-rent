// components/BookStatusTable.js

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const rows = [
  {
    no: "01",
    bookNo: "6465",
    bookName: "Derto Gada",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "02",
    bookNo: "6465",
    bookName: "Fiker Eske Mekabr",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "03",
    bookNo: "6465",
    bookName: "The Power of Now",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "04",
    bookNo: "5665",
    bookName: "Derto Gada",
    status: "Free",
    price: "0 Birr",
  },
  {
    no: "05",
    bookNo: "5665",
    bookName: "Derto Gada",
    status: "Free",
    price: "0 Birr",
  },
  {
    no: "06",
    bookNo: "1755",
    bookName: "Derto Gada",
    status: "Free",
    price: "0 Birr",
  },
];

const BookStatusTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Book No.</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no}>
              <TableCell>{row.no}</TableCell>
              <TableCell>{row.bookNo}</TableCell>
              <TableCell>{row.bookName}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookStatusTable;
