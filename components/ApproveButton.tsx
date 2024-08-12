"use client";
import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { createURL } from "@/lib/api";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);

  const handleApproveUser = async (event) => {
    setIsApproving(true);
    await fetch(createURL(`/api/admin/approve/owner/${ownerId}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approved: !isApproved,
      }),
    });
    router.refresh();
    setIsApproving(false);
  };

  const handleApproveBook = async (event) => {
    setIsApproving(true);
    await fetch(createURL(`/api/admin/approve/books/${bookId}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        approved: !isApproved,
      }),
    });
    router.refresh();
    setIsApproving(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ minWidth: 120, backgroundColor: isApproved ? "blue" : "gray" }}
        onClick={type === "USER" ? handleApproveUser : handleApproveBook}
        disabled={isApproving}
      >
        {!isApproving && <p>{isApproved ? "Approved" : "Approve"}</p>}
        {isApproving && <CircularProgress size={21} />}
      </Button>
    </>
  );
};

export default ApproveButton;
