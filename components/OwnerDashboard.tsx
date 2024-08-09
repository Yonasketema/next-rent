import React from "react";
import DashBoard from "./DashBoard";
import { getCurrentSignInUserServer } from "@/lib/authUser";

async function OwnerDashboard() {
  const user = await getCurrentSignInUserServer();

  let book = await fetch(
    `http://localhost:3000/api/user/${user.user.userId}/books`
  );

  book = await book.json();

  console.log(book);

  return (
    <>
      <DashBoard tableData={book?.data?.books} />
    </>
  );
}

export default OwnerDashboard;
