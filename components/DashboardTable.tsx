"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
  MRT_ColumnFiltersState,
} from "material-react-table";
import { Book, Role } from "@prisma/client";
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
import SvgIcon from "./SvgIcon";
import DeleteButton from "./DeleteButton";
import { createURL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useFilterData } from "@/lib/filterHook";

type TableProps = {
  books: Book[];
  role: Role;
  userId?: string;
};

export default function DashBoardTable({ books, role, userId }: TableProps) {
  const [isEditingBook, setIsEditingBook] = useState(false);

  const router = useRouter();

  const {
    data,
    isRefetching,
    setGlobalFilter,
    setColumnFilters,
    columnFilters,
    globalFilter,
  } = useFilterData(
    books,
    role === "ADMIN" ? "/api/books" : `/api/user/${userId}/books`
  );

  const handleSaveBook: MRT_TableOptions<Book>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    setIsEditingBook(true);
    await fetch(createURL(`/api/books/${values.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.bookName,
        status: values.Status,
        price: values.Price,
      }),
    });

    setIsEditingBook(false);
    table.setEditingRow(null); //exit editing mode
    router.refresh();
  };

  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        header: "id",
        Edit: () => null,
        enableEditing: false,
        Cell: () => null,
      },
      {
        accessorFn: (row) => row.categoryId,
        header: "categoryId",
        Edit: () => null,
        enableEditing: false,
        Cell: () => null,
      },
      {
        accessorFn: (row, i) => (i < 10 ? `0${++i}` : ++i),
        accessorKey: "no",
        header: "No.",
        maxSize: 20,
        enableEditing: false,
        enableColumnFilter: false,
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
        accessorFn: (row) => row.status,
        header: "Status",
        maxSize: 100,

        editVariant: "select",
        editSelectOptions: ["AVAILABLE", "RENTED", "UNAVAILABLE"],
        filterSelectOptions: ["AVAILABLE", "RENTED", "UNAVAILABLE"],
        filterVariant: "select",

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
            {row.original.status !== "UNAVAILABLE" ? (
              <>
                <SvgIcon
                  height={14}
                  src={`/icons/${
                    row.original.status === "RENTED" ? "rented" : "free"
                  }.svg`}
                />

                <span>
                  {row.original.status === "RENTED" ? "rented" : "free"}
                </span>
              </>
            ) : (
              "UNAVAILABLE"
            )}
          </Box>
        ),
      },
      {
        accessorFn: (row) => row.price,
        header: "Price",
        maxSize: 100,
        Cell: ({ row }) => <p>{row.original.price} Birr</p>,
        filterVariant: "range",
        filterFn: "between",
        size: 80,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    state: {
      // isLoading: true,
      isSaving: isEditingBook,
      globalFilter,
      showProgressBars: isRefetching,
      columnFilters,
    },
    columns,
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    // enableGlobalFilter: false,

    enableRowActions: true,
    onColumnFiltersChange: setColumnFilters,
    enableColumnActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableSorting: false,
    initialState: {
      density: "compact",
      columnVisibility: { id: false, categoryId: false },
      columnOrder: [
        "no",
        "bookNo",
        "bookName",
        "Status",
        "Price",
        "Actions",
        "id",
        "categoryId",
      ],
    },
    data: data || [],
    onEditingRowSave: handleSaveBook,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h6">Edit Book</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: 1, px: 1 }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteButton
          type="BOOK"
          bookId={row.original.id}
          sx={{ marginRight: 3 }}
        />
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Typography color="#222" fontSize={16} fontWeight="700">
        Live Book Status
      </Typography>
    ),
    muiTableContainerProps: {
      sx: {
        height: "333px",
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
