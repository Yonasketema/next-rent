"use client";

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
  CircularProgress,
} from "@mui/material";

import Image from "next/image";
import { signup } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/lib/zodSchemas";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
  });
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setErrors("");
    setFormValues({ ...formValues, [id]: value });
  };

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const inputs = signupSchema.parse(formValues);
      const newUser = await signup(
        inputs.phone,
        inputs.email,
        inputs.password,
        inputs.location,
      );
      setIsLoading(false);

      if (newUser) {
        router.push("/login");
      }
    } catch (error) {
      setIsLoading(false);
      setErrors(error.formErrors.fieldErrors);
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
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            <TextField
              fullWidth
              size="small"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}

            <TextField
              fullWidth
              size="small"
              label="Location"
              type="text"
              id="location"
              value={formValues.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p style={{ color: "red" }}>{errors.location}</p>
            )}

            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              type="tel"
              id="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

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
                p: 1,
              }}
              fullWidth
              disabled={!checked || isLoading}
              type="submit"
            >
              {isLoading ? <CircularProgress size={21} /> : "SIGN IN"}
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
