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
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { User } from "@prisma/client";
import { createURL } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

type ProfileProps = {
  user: User;
  children: React.ReactNode;
};

export default function ProfileEditor({ user, children }: ProfileProps) {
  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    location: user.location || "",
    phone: user.phone || "",

    image: user.image || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const handleRequestApproval = async () => {
    try {
      setIsLoading(true);
      await fetch(createURL(`/api/user/${user.id}/request-approval`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      setIsLoading(false);

      router.refresh();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleEditProfile = async () => {
    try {
      setIsLoading(true);

      await fetch(createURL(`/api/user/${user.id}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pathName === "/share-book") {
      await handleRequestApproval();
    } else {
      await handleEditProfile();
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
                  {pathName === "/share-book" ? (
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
                      {isLoading ? (
                        <CircularProgress size={21} />
                      ) : (
                        "Request Approval"
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {isLoading ? (
                        <CircularProgress size={21} />
                      ) : (
                        " Save Changes "
                      )}
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
