"use client";

import { Container, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0A23",
        backgroundImage: "url(/static/home_bg.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1, paddingRight: { md: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: "4rem",
                fontWeight: 700,
                background: "linear-gradient(45deg, #FFC947, #FF3CAC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Rent & Share Books
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.25rem",
                color: "#A3A3A3",
                mb: 4,
              }}
            >
              Welcome to the Rent Book App. Share your books, rent them to
              others, and earn money. Spread knowledge and create a community of
              readers.
            </Typography>
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #FFC947, #FF3CAC)",
                  color: "#0A0A23",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "right" },
              mt: { xs: 4, md: 0 },
            }}
          >
            Next
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
