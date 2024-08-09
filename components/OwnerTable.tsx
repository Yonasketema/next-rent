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
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ToggleSwitch from "./ToggleSwitch";
import ApproveButton from "./ApproveButton";

 
type TableProps = {
  owners: User[];
};

export default function OwnerTable({ owners }: TableProps) {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorFn: (row, i) => (i < 10 ? `0${++i}` : ++i),
        accessorKey: "no",
        header: "No.",
        maxSize: 50,
      },
      {
        accessorFn: (row) => row.name,
        id: "owner",
        header: "Owner",
        maxSize: 70,

        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="user avatar image" src="/static/images/avatar/1.jpg" />
            {row.name || "unknown"}
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
          <ToggleSwitch ownerId={row.id} status={row.original.status} />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: owners,
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
    renderTopToolbarCustomActions:()=>   <Typography  color="#222" fontSize={16}  fontWeight="700">
    List of Owner 
  </Typography>,
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
      <Box>
        <IconButton aria-label="view">
          <VisibilityIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton aria-label="delete" sx={{ color: "red", marginRight: 7 }}>
          <DeleteIcon />
        </IconButton>
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

//   return (
//     <Box
//       sx={{
//         gap: 3,
//         marginTop: 3,
//         p: 2,
//         backgroundColor: "white",
//         borderRadius: 3,
//       }}
//     >
//       <Typography variant="h6" color="#222" fontSize={19}>
//         List of Owner
//       </Typography>
//       <Table stickyHeader aria-label="sticky table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell main>No.</StyledTableCell>
//             <StyledTableCell main>Owner</StyledTableCell>
//             <StyledTableCell>Upload</StyledTableCell>
//             <StyledTableCell>Location</StyledTableCell>
//             <StyledTableCell>Status</StyledTableCell>
//             <StyledTableCell>Action</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, i) => (
//             <TableRow key={row.id}>
//               <StyledTableCell main>{i}</StyledTableCell>
//   <StyledTableCell
//     main
//     sx={{ display: "flex", alignItems: "center", gap: 1 }}
//   >
//     <Avatar
//       alt="user avatar image"
//       src="/static/images/avatar/1.jpg"
//     />
//     {row.name}
//   </StyledTableCell>
//               <StyledTableCell>{row._count.books}</StyledTableCell>
//               <StyledTableCell>{row.location}</StyledTableCell>
//               <StyledTableCell>
//                 <ToggleSwitch ownerId={row.id} status={row.status} />
//               </StyledTableCell>
//               <StyledTableCell>
//                 <IconButton aria-label="view">
//                   <VisibilityIcon sx={{ color: "black" }} />
//                 </IconButton>
//                 <IconButton aria-label="delete">
//                   <DeleteIcon sx={{ color: "red", marginRight: 7 }} />
//                 </IconButton>
//                 <ApproveButton
//                   type="USER"
//                   isApproved={row?.approved}
//                   ownerId={row.id}
//                 />
//               </StyledTableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };

// export default OwnerTable;
