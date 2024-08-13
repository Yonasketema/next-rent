import { Box } from "@mui/material";

export default function CreateAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171B36",
      }}
    >
      {children}
    </Box>
  );
}
