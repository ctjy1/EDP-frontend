import React from 'react';
import "../App.css";
import Home from "./Components/Home";
import About from "./Components/About";
//import Work from "./Components/Work";       <Work />
import Testimonial from "./Components/Testimonal";
//import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import http from "../http";
import UserContext from "../contexts/UserContext";
import * as jwtDecodeModule from "jwt-decode";



function UserHome() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecodeModule.jwtDecode(token);
        setUserRole(decoded["UserRole"])
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [user]); // You might need to adjust the dependency array

  console.log("UserRole:", userRole); // Debugging: Check userRole value

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
        <div className="App">
      <Home />
      <About />

      <Testimonial />
    
      <Footer />
    </div>
    </>
  );
}

export default UserHome;
