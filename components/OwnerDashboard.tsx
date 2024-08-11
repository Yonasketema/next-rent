import React from "react";
import DashBoard from "./DashBoard";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";

async function OwnerDashboard() {
  const user = await getCurrentSignInUserServer();

  let book = await fetch(
    createURL(`/api/user/${user.user.userId}/books`),
    {
      headers:new Headers(headers())
    }
  );

  book = await book.json();

 

  return (
    <>
      <DashBoard tableData={book?.data?.books} />
    </>
  );
}

export default OwnerDashboard;
