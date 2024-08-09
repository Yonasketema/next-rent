import React from "react";
import DashBoard from "./DashBoard";
import { getCurrentSignInUserServer } from "@/lib/authUser";

async function AdminDashboard() {
  const user = await getCurrentSignInUserServer();

  let book = await fetch(`http://localhost:3000/api/books`);

  book = await book.json();

  console.log(book);

  return (
    <>
      <DashBoard tableData={book?.data?.books} />
    </>
  );
}

export default AdminDashboard;
