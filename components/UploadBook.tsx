"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Modal,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Category } from "@prisma/client";
import Image from "next/image";
import { createURL } from "@/lib/api";
import { bookSchema } from "@/lib/zodSchemas";

type BookUploadProps = {
  categories: Category[];
};

const BookUploadPage = ({ categories }: BookUploadProps) => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    categoryId: "",
    price: "",
    quantity: "",
    cover: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const handleUpload = async () => {
    const newBook = bookSchema.parse({
      ...bookDetails,
      price: Number(bookDetails.price),
      quantity: Number(bookDetails.quantity),
    });

    await fetch(createURL(`/api/books`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: Number(value) || value });
  };

  const handleFileChange = (e) => {
    setBookDetails({ ...bookDetails, cover: e.target.files[0] });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box
          component="label"
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "350px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            textAlign: "center",
            lineHeight: "400px",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: bookDetails.cover
              ? `url(${URL.createObjectURL(bookDetails.cover)})`
              : "none",
          }}
        >
          {!bookDetails.cover && (
            <Typography variant="h6" color="textSecondary">
              Click to upload book cover
            </Typography>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <form>
          <TextField
            label="Title"
            name="title"
            value={bookDetails.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            name="author"
            value={bookDetails.author}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>

            <Select
              label="Category"
              name="categoryId"
              value={bookDetails.categoryId}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Price"
            name="price"
            value={bookDetails.price}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={bookDetails.quantity}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload Book
          </Button>
        </form>
      </Grid>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",

            borderRadius: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          <Image src="/static/smile.svg" alt="smile" width={200} height={180} />
          <Typography variant="h6">Congrats!</Typography>
          <Typography variant="body1" sx={{ color: "#777" }}>
            Your have uploaded the book successfully. Waite until we approved
            it.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{ mt: 2, backgroundColor: "#00ABFF" }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default BookUploadPage;
