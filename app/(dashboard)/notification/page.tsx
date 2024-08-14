import React from "react";
import { Box } from "@mui/material";
import OwnerTable from "@/components/OwnerTable";
import { redirect } from "next/navigation";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";
import prisma from "@/lib/prisma";

const Notification = async () => {
  const user = await getCurrentSignInUserServer();

  if (user?.user?.role !== "ADMIN")
    return (
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
        Notification
      </Box>
    );

  await prisma.approvalRequest.updateMany({
    where: {
      seen: false,
    },
    data: {
      seen: true,
    },
  });

  const approvalRequests = await prisma.approvalRequest.findMany({
    where: {
      status: "PENDING",
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: approvalRequests.map((ar) => ar.userId),
      },
    },
    include: {
      _count: {
        select: {
          books: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
      <OwnerTable owners={users} title="users request approval" />
    </Box>
  );
};

export default Notification;
