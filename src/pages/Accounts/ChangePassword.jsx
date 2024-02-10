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
      // Retrieve token from storage
      const token = localStorage.getItem('token');
      if (typeof token === 'string' && token.trim()) {
        try {
          // Decode token to get user information
          const decoded = jwtDecode(token);
          // If you need userId or any other user data, ensure it's included in your token and use it here
          // Example: const userId = decoded.userId;

          // Make API call to change password
          http.post("/User/change-password", values)
            .then(response => {
              toast.success("Password changed successfully");
            })
            .catch(error => {
              if (error.response) {
                console.error("Error Response:", error.response);
                toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
              } else if (error.request) {
                console.error("Error Request:", error.request);
                toast.error("No response from server");
              } else {
                console.error("Error Message:", error.message);
                toast.error("Error in request setup");
              }
            });
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Invalid token. Please log in again.");
        }
      } else {
        console.error("Token not found or invalid.");
        toast.error("You must be logged in to change your password.");
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
