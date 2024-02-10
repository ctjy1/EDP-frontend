import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http"; // Assuming http is your configured Axios instance
import { ToastContainer, toast } from "react-toastify";
// Corrected import statement for jwt-decode
import {jwtDecode} from 'jwt-decode';

function ChangePassword() {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required("Old Password is required"),
      newPassword: yup.string().required("New Password is required"),
      confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], "Passwords must match")
        .required("Confirm New Password is required"),
    }),
    onSubmit: (values) => {
      const token = localStorage.getItem('token');
    
      // Check if token is present
      if (!token) {
        console.error("Token not found.");
        toast.error("You must be logged in to change your password.");
        return; // Exit the function early
      }
    
      try {
        // Assuming you are using a correct jwtDecode function
        // Note: Common mistake is not having the correct import or usage
        // It should be something like: import jwtDecode from 'jwt-decode';
        const decoded = jwtDecode(token);
        
        // Proceed with your password change logic here
        // Make sure to include user ID in your API call if needed
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please log in again.");
      }
    },
    
    
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
      <Typography variant="h2" sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}>
        <strong>Change Password</strong>
      </Typography>
      <Box component="form" sx={{ maxWidth: "500px" }} onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ backgroundColor: "#fdcda9", mb: 2 }}
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Old Password"
          name="oldPassword"
          type="password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
          sx={{ backgroundColor: "#fdcda9", mb: 2 }}
          fullWidth
          margin="dense"
          autoComplete="off"
          label="New Password"
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
          sx={{ backgroundColor: "#fdcda9" }}
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Confirm New Password"
          name="confirmNewPassword"
          type="password"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
          helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Change Password
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default ChangePassword;
