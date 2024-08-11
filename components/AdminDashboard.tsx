import React from "react";
import DashBoard from "./DashBoard";
import { headers } from "next/headers";
import { createURL } from "@/lib/api";
 

async function AdminDashboard() {
 
 
  
  let book = await fetch(createURL("/api/books"),{
    headers:new Headers(headers())
  });
  
  book = await book.json();

   

  return (
    <>
      <DashBoard tableData={book?.data?.books} />
    </>
  );
}

export default AdminDashboard;
