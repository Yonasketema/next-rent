"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { User } from "@prisma/client";
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
 

type TableProps = {
  owners: User[];
  title: string;
};

export default function RequestApprovalNotificationTable({ owners, title }: TableProps) {

 

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorFn: (row, i) => (i < 10 ? `0${++i}` : ++i),
        accessorKey: "no",
        header: "No.",
        maxSize: 50,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.name,
        id: "owner",
        header: "Owner",
        maxSize: 70,

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="user avatar image" src="/static/images/avatar/1.jpg" />
            {row.original.name || "unknown"}
          </Box>
        ),
      },
      {
        accessorFn: (row) => row._count.books + " Books",
        id: "upload",
        header: "Upload",
        maxSize: 100,
      },
      {
        accessorFn: (row) => row.location,
        id: "location",
        header: "Location",
        maxSize: 120,
      },
      {
        header: "Status",
        maxSize: 100,

        Cell: ({ row }) => (
          <ToggleSwitch
            ownerId={row.original.id}
            status={row.original.status}
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    state: {
      // isLoading: true,
      // globalFilter,
      // showProgressBars: isRefetching,
      // columnFilters,
    },
    manualFiltering: true,
    // onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    columns,
    data:owners,
    enableRowActions: true,
    enableColumnActions: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableSorting: false,
    initialState: {
      density: "compact",
      columnOrder: ["no", "owner", "upload", "location", "Status", "Actions"],
    },
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    renderTopToolbarCustomActions: () => (
      <Typography color="#222" fontSize={16} fontWeight="700">
        {title}
      </Typography>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
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
      <Box sx={{ display: "flex" }}>
        <IconButton aria-label="view">
          <VisibilityIcon sx={{ color: "black" }} />
        </IconButton>
        <DeleteButton
          type="USER"
          userId={row.original.id}
          sx={{ marginRight: 3 }}
        />

        <ApproveButton
          type="USER"
          isApproved={row?.original.approved}
          ownerId={row.id}
        />
      </Box>
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
