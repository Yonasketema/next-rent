"use client";

import { useRef, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
} from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { signupUser } from "@/actions/login";
import { useFormState } from "react-dom";

export default function Signup() {
 
  const [errors, setErrors] = useState(null);
  const formRef = useRef(null)

  // async function action(data) {
  //   const {error}= await signupUser(data)
  //    if(error){
  //      setErrors(error)
  //    }else{
  //     setErrors(null)
  //     formRef.current.reset()
  //    }
  //  }

  const [formState,formAction] = useFormState(signupUser,null)

  if(typeof formState?.errors ===  "string" ){
    console.log(formState.errors)
    throw new Error('Error happen when signup a user!')
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
            ref={formRef}
            action={formAction}
          >
            <TextField
              fullWidth
              size="small"
              label="Email address"
              type="email"
              id="email"
              name="email"
            />
              <p style={{ color: "red" }}>{formState?.errors?.email?._errors.join(',')}</p>

            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              id="password"
              name="password"
            />
              <p style={{ color: "red" }}>{formState?.errors?.password?._errors.join(',')}</p>


            <TextField
              fullWidth
              size="small"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />

  <p style={{ color: "red" }}>{formState?.errors?.confirmPassword?._errors.join(',')}</p>


            <TextField
              fullWidth
              size="small"
              label="Location"
              type="text"
              id="location"
              name="location"
            />
 <p style={{ color: "red" }}>{formState?.errors?.location?._errors.join(',')}</p>

            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
            />
 <p style={{ color: "red" }}>{formState?.errors?.phone?._errors.join(',')}</p>

            

            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckChange}
                  name="terms"
                  color="primary"
                />
              }
              label="I accept the Terms and Conditions"
            /> */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#00ABFF",
                p: 1,
              }}
              fullWidth
              // disabled={!checked || isLoading}
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
