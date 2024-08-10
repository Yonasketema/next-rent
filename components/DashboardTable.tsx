"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Book } from "@prisma/client";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Tooltip,
  Icon,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

 
type TableProps = {
  books: Book[];
};

export default function DashBoardTable({ books }: TableProps) {
  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorFn: (row, i) => (i < 10 ? `0${++i}` : ++i),
        accessorKey: "no",
        header: "No.",
        maxSize: 50,
      },
      {
        accessorFn: (row, i) => row.id,
        id: "bookNo",
        header: "Book No",
        maxSize: 70,

        Cell: ({ row }) => (
          <Box
            sx={{
              backgroundColor: "#9999991A",
              p: 0.3,
              textAlign: "center",
              borderRadius: 1.2,
              maxWidth: 70,
            }}
          >
            bookNo
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.title,
        id: "bookName",
        header: "Book Name",
        maxSize: 130,
      },
      {
        header: "Status",
        maxSize: 100,

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
            <Icon
              sx={{
                textAlign: "center",
                height: 14,
              }}
            >
              <Image
                alt=""
                style={{
                  display: "flex",
                  height: "inherit",
                  width: "inherit",
                }}
                src={`/icons/${
                  row.original.status === "RENTED" ? "rented" : "free"
                }.svg`}
              />
            </Icon>

            <span>{row.original.status === "RENTED" ? "rented" : "free"}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.price + " Birr",
        header: "Price",
        maxSize: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    enableRowActions: true,
    enableColumnActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableSorting: false,
    initialState: {
      density: "compact",
      columnOrder: ["no", "bookNo", "bookName", "Status", "Price", "Actions"],
    },
    data: books,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Book</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Typography  color="#222" fontSize={16}  fontWeight="700" >
      Live Book Status
  </Typography>
    ),
    muiTableContainerProps: {
      sx: {
        minHeight: "200px",
        width: "100%",
      },
    },
    muiTablePaperProps: {
      sx: {
        border: "none",
        boxShadow: "none",
        backgroundColor: "transparent",
      },
    },
  });

  return <MaterialReactTable table={table} />;
}
