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
  Avatar,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleSwitch from "./ToggleSwitch";
import ApproveButton from "./ApproveButton";
import DeleteButton from "./DeleteButton";
import { useFilterData } from "@/lib/filterHook";

type TableProps = {
  books: Book[];
  categories: any;
};

export default function BookTable({ books, categories }: TableProps) {
  const {
    data,
    isRefetching,
    setGlobalFilter,
    setColumnFilters,
    columnFilters,
    globalFilter,
  } = useFilterData(books, "/api/books", categories);

  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorFn: (row, i) => (i < 10 ? `0${++i}` : ++i),
        header: "No.",
        maxSize: 10,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.author,
        id: "author",
        header: "Author",
        maxSize: 107,
      },
      {
        id: "owner",
        header: "Owner",
        maxSize: 107,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="user avatar image" src="/static/images/avatar/1.jpg" />
            {row.original.owner.name || "unknown"}
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.category.name,
        id: "category",
        header: "Category",
        maxSize: 120,
        filterSelectOptions: categories.map((cat) => cat.name),
        filterVariant: "select",
      },
      {
        accessorFn: (row) => row.title,
        id: "bookName",
        header: "Book Name",
        maxSize: 120,
      },
      {
        header: "Status",
        maxSize: 100,

        Cell: ({ row }) => (
          <ToggleSwitch
            status={row.original.owner?.status}
            ownerId={row?.original.ownerId}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    state: {
      // isLoading: true,
      globalFilter,
      showProgressBars: isRefetching,
      columnFilters,
    },
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    columns,
    data,
    enableRowActions: true,
    enableColumnActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableSorting: false,
    initialState: {
      density: "compact",
      columnOrder: [
        "No.",
        "author",
        "owner",
        "category",
        "bookName",
        "Status",
        "Actions",
      ],
    },
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
    renderTopToolbarCustomActions: () => (
      <Typography color="#222" fontSize={16} fontWeight="700">
        List of Books
      </Typography>
    ),
    renderRowActions: ({ row, table }) => (
      <Box>
        <IconButton aria-label="view">
          <VisibilityIcon sx={{ color: "black" }} />
        </IconButton>

        <DeleteButton
          type="BOOK"
          bookId={row.original.id}
          sx={{ marginRight: 3 }}
        />

        <ApproveButton
          type="BOOK"
          isApproved={row?.original.approved}
          bookId={row.original.id}
        />
      </Box>
    ),

    muiTableContainerProps: {
      sx: {
        minHeight: "300px",
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
