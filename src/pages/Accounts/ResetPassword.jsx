import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import http from "../../http"; // Ensure this is set up to make HTTP requests

// Validation schema
const validationSchema = yup.object({
  newPassword: yup
    .string("Enter your new password")
    .required("New password is required")
    .min(8, "Password should be of minimum 8 characters length"),
  confirmPassword: yup
    .string("Confirm your new password")
    .required("Confirm your password")
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

function ResetPassword() {
  // Extract the token from the query string
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  const handleSubmit = async (values) => {
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      // Replace '/reset-password' with your actual endpoint
      await http.post('/User/reset-password', {
        token: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Your password has been reset successfully.");
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
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
        <strong>Password Reset </strong>
      </Typography>
      <Box component="form" sx={{ maxWidth: "500px" }} onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="New Password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          sx={{ backgroundColor: "#fdcda9", color: "#1a1a1a" }}
          InputProps={{
            style: {
              color: "#1a1a1a",
              width: "100%",
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          sx={{ backgroundColor: "#fdcda9", color: "#1a1a1a" }}
          InputProps={{
            style: {
              color: "#1a1a1a",
              width: "100%",
            },
          }}
        />
        <Button variant="contained" sx={{ mt: 3 }} fullWidth type="submit">
          Reset Password
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default ResetPassword;
