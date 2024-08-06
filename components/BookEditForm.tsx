import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BookEditForm = ({ open, handleClose, book, handleSave }) => {
  const [formValues, setFormValues] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSave = () => {
    handleSave(formValues);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Edit Book
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Book Name"
          name="bookName"
          value={formValues.bookName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Status"
          name="status"
          value={formValues.status}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Price"
          name="price"
          value={formValues.price}
          onChange={handleChange}
        />
        <Button onClick={onSave} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default BookEditForm;
