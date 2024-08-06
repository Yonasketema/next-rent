import MiniDrawer from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MiniDrawer>{children}</MiniDrawer>
    </main>
  );
}
