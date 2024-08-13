import MiniDrawer from "@/components/Sidebar";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentSignInUserServer();

  if (!user || user.user.role === "USER") return redirect("/");

  let not = null;
  if (user.user.role === "ADMIN") {
    let approvalRequests = await prisma.approvalRequest.findMany({
      where: {
        seen: false,
      },
    });
    if (approvalRequests.length > 0) {
      not = approvalRequests.map((n) => n.userId);
    }
  }

  return (
    <main>
      <MiniDrawer userIds={not} user={user}>
        {children}
      </MiniDrawer>
    </main>
  );
}
