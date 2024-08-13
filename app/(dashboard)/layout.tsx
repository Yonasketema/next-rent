import MiniDrawer from "@/components/Sidebar";
import { getCurrentSignInUserServer } from "@/lib/authUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentSignInUserServer();

  if (!user || user.user.role === "USER") return redirect("/");

  return (
    <main>
      <MiniDrawer user={user}>{children}</MiniDrawer>
    </main>
  );
}
