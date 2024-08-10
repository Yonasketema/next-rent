import React from "react";
import DashBoard from "./DashBoard";
import { headers } from "next/headers";
 

async function AdminDashboard() {
 
 
  
  let book = await fetch(`http://localhost:3000/api/books`,{
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
