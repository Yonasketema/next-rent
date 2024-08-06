"use client";
// components/FloatingLabelInput.js

import { TextField } from "@mui/material";

const FormInput = ({ label, type = "text", id, value, onChange }) => {
  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      type={type}
      variant="outlined"
      value={value}
      onChange={onChange}
      margin="normal"
    />
  );
};

export default FormInput;
