"use client";
import React, { useState } from "react";
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createURL } from "@/lib/api";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  type: "BOOK" | "USER";
  userId?: string;
  bookId?: string;
  sx?: any;
};

const DeleteButton = ({ type, userId, bookId, sx }: DeleteButtonProps) => {
  const router = useRouter();
  const [isDeleteing, setIsDeleting] = useState(false);

  const handleDeleteUser = async (event) => {
    setIsDeleting(true);
    await fetch(createURL(`/api/user/${userId}`), {
      method: "DELETE",
    });
    router.refresh();

    setIsDeleting(false);
  };

  const handleDeleteBook = async (event) => {
    setIsDeleting(true);

    await fetch(createURL(`/api/books/${bookId}`), {
      method: "DELETE",
    });
    router.refresh();
    setIsDeleting(false);
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          sx={sx}
          onClick={type === "USER" ? handleDeleteUser : handleDeleteBook}
        >
          {isDeleteing ? <CircularProgress size={16} /> : <DeleteIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteButton;
