"use client";
import React, { useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


type DeleteButtonProps = {
  type: "BOOK" | "USER";
  userId?: string;
  bookId?: string;
  sx?:any
};

const DeleteButton = ({
  type,
  userId,
  bookId,
  sx
}: DeleteButtonProps) => {
  const handleDeleteUser = async (event) => {
    await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
      
    });
  };

  const handleDeleteBook = async (event) => {
    await fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: "DELETE",
      
    });
  };

  return (
    <>
 
      <Tooltip title="Delete" >
          <IconButton color="error" sx={sx}
           onClick={type === "USER" ? handleDeleteUser : handleDeleteBook}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
       
    
    </>
  );
};

export default DeleteButton;
