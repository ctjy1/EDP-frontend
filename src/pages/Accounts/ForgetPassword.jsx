import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import http from "../../http"; // Ensure this is correctly set up to make HTTP requests

// Yup validation schema
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

function ForgetPassword() {
  const handleSubmit = async (values) => {
    try {
      // Replace '/forget-password' with your actual endpoint
      await http.post('/User/forget-password', { email: values.email });
      toast.success("If an account with that email exists, we have sent a password reset link.");
    } catch (error) {
      toast.error("An error occurred while requesting password reset.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid  orange", paddingBottom: "7px", color: 'red' }}>
        <strong>Password Reset Request</strong>
      </Typography>
      <Box component="form" sx={{ width: "500px" }} onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ backgroundColor: "#fdcda9", color: "#1a1a1a" }}
          InputProps={{
            style: {
              color: "#1a1a1a",
              width: "100%",
            },
          }}
        />
        
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Request Reset
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default ForgetPassword;
