import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  AccessTime,
  Search,
  Clear,
  Edit,
} from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import http from "../http";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import global from "../global";

function AdminHome() {
 
  return (
    <Box>
      <Typography variant="h1" sx={{ my: 4, textAlign: "center", color: '#000'}}>
        <strong>Admin Home</strong>
      </Typography>

     
    </Box>
  );
}

export default AdminHome;
