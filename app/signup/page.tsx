"use client"

import { SyntheticEvent, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
} from "@mui/material";

import Image from "next/image";
import { signup } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
  });
  const [checked, setChecked] = useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const newUser = await signup(
        formValues.phone,
        formValues.email,
        formValues.password,
        formValues.location
      );

      if (newUser) {
        router.push("/login");
      }
    } catch (error) {}
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
          <Typography variant="h5" color="black" component="h2" gutterBottom>
            Signup into Book Rent
          </Typography>
          <Divider />

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 21,
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              size="small"
              label="Email address"
              type="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Location"
              type="text"
              id="location"
              value={formValues.location}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              type="tel"
              id="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckChange}
                  name="terms"
                  color="primary"
                />
              }
              label="I accept the Terms and Conditions"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#00ABFF",
              }}
              fullWidth
              disabled={!checked}
              type="submit"
            >
              SIGN IN
            </Button>
            <Typography
              variant="body2"
              color="gray"
              align="center"
              marginTop={2}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "#00ABFF", textDecoration: "underline" }}
              >
                Login
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
