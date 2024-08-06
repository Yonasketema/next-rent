import { styled } from "@mui/material/styles";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Icon,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookEditForm from "./BookEditForm";

const rows = [
  {
    no: "01",
    bookNo: "6465",
    bookName: "Derto Gada",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "01",
    bookNo: "6465",
    bookName: "Fikr Eske Mekabr",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "01",
    bookNo: "6465",
    bookName: "The Power of Now",
    status: "Rented",
    price: "40 Birr",
  },
  {
    no: "02",
    bookNo: "5665",
    bookName: "Derto Gada",
    status: "Free",
    price: "0.0 Birr",
  },
  {
    no: "02",
    bookNo: "5665",
    bookName: "Derto Gada",
    status: "Free",
    price: "0.0 Birr",
  },
  {
    no: "03",
    bookNo: "1755",
    bookName: "Derto Gada",
    status: "Free",
    price: "0.0 Birr",
  },
];

const StyledTableCell = styled(TableCell)(({ theme, main }) => ({
  color: main ? "#1A1919" : "#656575",
}));

const BookStatusTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (updatedBook) => {
    const updatedRows = rows.map((row) =>
      row.bookNo === updatedBook.bookNo ? updatedBook : row
    );

    console.log("Updated Book List:", updatedRows);
  };

  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Book No.</StyledTableCell>
            <StyledTableCell>Book Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no}>
              <StyledTableCell main>{row.no}</StyledTableCell>
              <StyledTableCell main>
                <Box
                  sx={{
                    backgroundColor: "#9999991A",
                    p: 0.3,
                    textAlign: "center",
                    borderRadius: 1.2,
                  }}
                >
                  {row.bookNo}
                </Box>
              </StyledTableCell>
              <StyledTableCell main>{row.bookName}</StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                  <Icon
                    sx={{
                      textAlign: "center",
                      height: 14,
                    }}
                  >
                    <img
                      style={{
                        display: "flex",
                        height: "inherit",
                        width: "inherit",
                      }}
                      src={`/icons/${
                        row.status === "Rented" ? "rented" : "free"
                      }.svg`}
                    />
                  </Icon>

                  <span>{row.status}</span>
                </Box>
              </StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
                  <EditIcon sx={{ color: "#1A1919" }} />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBook && (
        <BookEditForm
          open={open}
          handleClose={handleClose}
          book={selectedBook}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default BookStatusTable;
