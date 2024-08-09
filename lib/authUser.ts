import { getServerSession } from "next-auth";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentSignInUserServer() {
  const session = await getServerSession(auth);
  if (!session) return null;

  console.log("[x] ServerSession", session);
  return session;
}
