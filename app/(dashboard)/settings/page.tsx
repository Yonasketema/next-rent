import React from "react";
import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import prisma from "@/lib/prisma";
import ProfileEditor from "@/components/EditProfile";

const Settings = async () => {
  const user = await getCurrentSignInUserServer();

  if (!user?.user) return redirect("/login?callbackUrl=/share-book");
  if (user?.user?.role == "OWNER") return redirect("/dashboard");

  const reqApproval = await prisma.approvalRequest.findFirst({
    where: {
      userId: user.user?.userId,
    },
  });

  if (!reqApproval) {
    const userData = await prisma.user.findFirst({
      where: {
        id: user.user.userId,
      },
    });

    return (
      <ProfileEditor user={userData!}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Request Admin Approval
        </Typography>
        {/* <Typography   sx={{ mt: 2,textAlign:"left" }}>
          To become an owner and upload books, you need to request approval from the admin. Do you want to proceed?
        </Typography> */}
      </ProfileEditor>
    );
  }

  return (
    <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3 }}>
      wait until the admin approved your request
    </Box>
  );
};

export default Settings;
