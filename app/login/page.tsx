"use client";
import { SyntheticEvent, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const signResponse = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });
    if (signResponse && signResponse.ok) {
      router.push("/dashboard");
    } else {
      console.log("sign error", signResponse?.error);
      // TODO:toast
    }
  }

  return (
    <Box display="flex" height="100vh">
      <Box
        flex={1}
        bgcolor="#171B36"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/static/book-logo-lg.svg"
          alt="Book Logo"
          width={377.66}
          height={209}
        />
      </Box>

      {/* Right side with form */}
      <Box
        flex={1}
        display="flex"
        bgcolor="white"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 4,
            }}
          >
            <Image
              src="/static/book-logo-small.svg"
              alt="Book Logo"
              width={50.66}
              height={39}
            />
            <Typography variant="h5">Book Rent</Typography>
          </Box>
          <Typography variant="h5" gutterBottom>
            Login to Book Rent
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <TextField
              size="small"
              label="Email address"
              type="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#00ABFF",
              }}
              fullWidth
              type="submit"
            >
              LOGIN
            </Button>
            <Typography
              color="gray"
              variant="body2"
              align="center"
              marginTop={2}
            >
              Don&#39;t have an account?
              <Link
                href="/signup"
                style={{ color: "#00ABFF", textDecoration: "underline" }}
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
