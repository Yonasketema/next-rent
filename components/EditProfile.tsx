"use client";

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { User } from "@prisma/client";
import { createURL } from "@/lib/api";

type ProfileProps = {
  user: User;
  children: React.ReactNode;
};

export default function ProfileEditor({ user ,children}: ProfileProps) {
  const [userData, setUserData] = useState({
    name: user.name || "",
    email:user.email || "",
    location: user.location || "",
    phone: user.phone ||  "",
   
    image: user.image || "",
  });

  const handleRequestApproval = async () => {
    await fetch(createURL(`/api/user/${user.id}/request-approval`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  const handleEditProfile = async () => {
    await fetch(createURL(`/api/user/${user.id}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
     if(!user.approved){
      await   handleRequestApproval()
     }else{
       await handleEditProfile()

     }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        
           {children}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={userData.image || ""}
                alt="Profile Image"
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <input
                accept="image/*"
                id="profile-image-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-image-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  {user.approved ? (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save Changes
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        p: 2,
                        fontWeight: "bold",
                        backgroundColor: "#0A0A23",
                      }}
                    >
                      Request Approval
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
