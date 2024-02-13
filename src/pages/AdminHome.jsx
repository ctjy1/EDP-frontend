import React from "react";
import { Typography, Box } from "@mui/material";

function AdminHome() {
  return (
    <Box sx={{ backgroundColor: '#1F2A40', minHeight: '100vh' }}>
      <Typography variant="h1" sx={{ my: 4, textAlign: "center", color: '#FFF' }}>
        <strong>Admin Home</strong>
      </Typography>
      {/* Your other components and content here */}
    </Box>
  );
}

export default AdminHome;
