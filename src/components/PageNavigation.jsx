import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageNavigation = ({ title }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <ArrowBackIcon fontSize="large" />
        <span style={{ marginLeft: "5px" }}>Back to {title}</span>
      </Link>
    </div>
  );
};

export default PageNavigation;