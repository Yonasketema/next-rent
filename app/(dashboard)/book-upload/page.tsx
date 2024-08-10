import { getCurrentSignInUserServer } from "@/lib/authUser";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

async function page() {

  const user = await getCurrentSignInUserServer();
  
  if (user?.user?.role !== "OWNER") return redirect("/login?callbackUrl=/dashboard");

  
  return <div>Upload books</div>;
}

export default page;
