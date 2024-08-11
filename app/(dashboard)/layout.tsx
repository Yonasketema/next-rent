import MiniDrawer from "@/components/Sidebar";
import { getCurrentSignInUserServer } from "@/lib/authUser";

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentSignInUserServer();
  return (
    <main>
      <MiniDrawer user={user} >{children}</MiniDrawer>
    </main>
  );
}
