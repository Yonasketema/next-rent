import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentSignInUserServer() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  console.log("[x] ServerSession", session);
  return session;
}
