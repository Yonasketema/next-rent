"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";

type ApproveButtonProps = {
  type: "BOOK" | "USER";
  ownerId?: string;
  isApproved: boolean;
  bookId?: string;
};

const ApproveButton = ({
  type,
  ownerId,
  bookId,
  isApproved,
}: ApproveButtonProps) => {
  const handleApproveUser = async (event) => {
    await fetch(`http://localhost:3000/api/admin/approve/owner/${ownerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approved: !isApproved,
      }),
    });
  };

  const handleApproveBook = async (event) => {
    await fetch(`http://localhost:3000/api/admin/approve/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approved: !isApproved,
      }),
    });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ minWidth: 120, backgroundColor: isApproved ? "blue" : "gray" }}
        onClick={type === "USER" ? handleApproveUser : handleApproveBook}
      >
        {isApproved ? "Approved" : "Approve"}
      </Button>
    </>
  );
};

export default ApproveButton;
