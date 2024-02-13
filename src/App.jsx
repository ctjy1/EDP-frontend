import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  AppBar,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ColorModeContext, useMode } from "./themes/MyTheme";
import UserContext from "./contexts/UserContext";
import * as jwtDecodeModule from "jwt-decode";
import Logo from "./assets/Logo.png";

// Accounts
import Gallery from "./pages/Accounts/Gallery";
import AddGallery from "./pages/Accounts/AddGallery";
import EditPost from "./pages/Accounts/EditPost";
import EditUserDetails from "./pages/Accounts/EditUserDetails";
import ChangePassword from "./pages/Accounts/ChangePassword";
import UserReferralTracking from "./pages/Accounts/UserReferralTracking";
import UserProfile from "./pages/Accounts/UserProfile";
import ManageReferralTracking from "./pages/Accounts/ManageReferralTracking";
import ManageUsers from "./pages/Accounts/ManageUsers";
import ManageAdmin from "./pages/Accounts/ManageAdmin";
import Register from "./pages/Accounts/Register";
import Login from "./pages/Accounts/Login";
import ForgetPassword from "./pages/Accounts/ForgetPassword";
import ResetPassword from "./pages/Accounts/ResetPassword";
import ReferralPage from "./pages/Accounts/ReferralPage";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import Chatbot from "./pages/Components/Chatbot";

// Activitys
import AddActivity from "./pages/Activity/AddActivity";
import ManageActivities from "./pages/Activity/ManageActivities";
import SingleActivity from "./pages/Activity/SingleActivity";

// Assuming RedirectHandler is properly defined in './RedirectHandler'
import RedirectHandler from "./RedirectHandler";
import http from "./http";
import LogoutButton from "./LogoutButton";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/"); // Navigating to home page after logout
  };

  // Define different colors for different user roles
  const getColorForRole = (role) => {
    switch (role) {
      case "user":
        return "white"; //  color for regular users
      case "Account Manager":
        return "#1F2A40"; //  color for account managers
      case "Super Adminstrator":
        return "#1F2A40"; //  color for super administrators
      default:
        return "white"; // Default color
    }
  };

  // Define different link colors for different user roles
  const getLinkColorForRole = (role) => {
    switch (role) {
      case "user":
        return "black"; //  color for regular users
      case "Account Manager":
        return "white"; //  color for account managers
      case "Super Adminstrator":
        return "white"; //  color for super administrators
      default:
        return "black"; // Default color
    }
  };

  const appBarStyle = {
    backgroundColor: getColorForRole(userRole), // Set background color based on user role
  };
  const linkStyle = {
    color: getLinkColorForRole(userRole), // Use the function to determine link color based on user role
    textDecoration: "none", // Remove underline from links
    margin: "0 10px", // Add margin to links
    fontSize: '200px',
    display: "flex", // Use flexbox for layout
    justifyContent: "center", // Center the links horizontally
    alignItems: 'center'
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <Router>
        <RedirectHandler setUser={setUser} setUserRole={setUserRole} />{" "}
        {/* Ensure RedirectHandler is used correctly */}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
              position="static"
              className="AppBar"
              style={appBarStyle}
              elevation={0}
              sx={{ paddingTop: "10px" }}
            >
              <Container>
                <Toolbar disableGutters={true}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="h3" component="div" sx={{color: 'orangered'}}>
                    <img src={Logo} alt="" />
                    </Typography>
                  </Link>
                  {userRole === "user" && (
                    <>
                      <Link
                        to="/"
                        style={linkStyle}
                      >
                        <Typography>Home</Typography>
                      </Link>

                      <Link
                        to="/"
                        style={linkStyle}
                      >
                        <Typography>Activities</Typography>
                      </Link>

                      <Link
                        to="/gallery"
                        style={linkStyle}
                      >
                        <Typography>Gallery</Typography>
                      </Link>

                      <Link
                        to="/Cart"
                        style={linkStyle}
                      >
                        <Typography>Cart</Typography>
                      </Link>
                    </>
                  )}
                  {userRole === "Account Manager" && (
                    <>
                      
                      <Link
                        to="/manageUsers"
                        style={linkStyle}
                      >
                        <Typography>Manage Users</Typography>
                      </Link>
                      <Link
                        to="/manageAdmin"
                        style={linkStyle}
                      >
                        <Typography>Manage Adminstrators</Typography>
                      </Link>
                      <Link
                        to="/manageReferralTracking"
                        style={linkStyle}
                      >
                        <Typography>Manage Referral Tracking</Typography>
                      </Link>
                    </>
                  )}
                  {userRole === "Super Adminstrator" && (
                    <>
                      <Link
                        to="/manageUsers"
                        style={linkStyle}
                      >
                        <Typography>Accounts</Typography>
                      </Link>
                      <Link
                        to="/"
                        style={linkStyle}
                      >
                        <Typography>Bookings</Typography>
                      </Link>
                      <Link
                        to="/manageactivities"
                        style={linkStyle}
                      >
                        <Typography>Activities</Typography>
                      </Link>
                      <Link
                        to="/managerewards"
                        style={linkStyle}
                      >
                        <Typography>Feedbacks</Typography>
                      </Link>
                      <Link
                        to="/manageRewards"
                        style={linkStyle}
                      >
                        <Typography>Rewards</Typography>
                      </Link>
                      
                    </>
                  )}

                  <Box sx={{ flexGrow: 1 }}></Box>
                  {user ? (
                    <>
                      <Link to="/userProfile" style={linkStyle}>
                        <Typography
                          component="div"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <AccountCircleIcon sx={{ marginRight: 1 }} />
                          <strong>@{user.username}</strong>
                        </Typography>
                      </Link>
                      <LogoutButton />
                    </>
                  ) : (
                    <>
                      <Link to="/register" style={linkStyle}>
                        <Typography sx={{ fontSize: "20px" }}>
                          <strong>REGISTER</strong>
                        </Typography>
                      </Link>
                      <Link to="/login" style={linkStyle}>
                        <Typography sx={{ fontSize: "20px" }}>
                          <strong>LOGIN</strong>
                        </Typography>
                      </Link>
                    </>
                  )}
                </Toolbar>
              </Container>
            </AppBar>
            <Container>
              <Routes>
                <Route path={"/"} element={<UserHome />} />
                <Route path={"/gallery"} element={<Gallery />} />
                <Route path={"/addgallery"} element={<AddGallery />} />
                <Route path={"/editpost/:id"} element={<EditPost />} />
                <Route path={"/addactivity"} element={<AddActivity />} />
                <Route path={"/manageactivities"} element={<ManageActivities />} />
                <Route path={"/SingleActivity/:id"} element={<SingleActivity />} />
                <Route
                  path={"/editUserDetails/:id"}
                  element={<EditUserDetails />}
                />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path={"/forgetPassword"} element={<ForgetPassword />} />
                <Route path={"/resetPassword"} element={<ResetPassword />} />
                <Route
                  path={"/userReferralTracking"}
                  element={<UserReferralTracking />}
                />
                <Route path={"/referralPage"} element={<ReferralPage />} />
                <Route path={"/userProfile"} element={<UserProfile />} />
                <Route path={"/manageUsers"} element={<ManageUsers />} />
                <Route path={"/manageAdmin"} element={<ManageAdmin />} />
                <Route
                  path={"/manageReferralTracking"}
                  element={<ManageReferralTracking />}
                />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/adminHome"} element={<AdminHome />} />
                <Route path={"/userHome"} element={<UserHome />} />
                <Route path={"/chatbot"} element={<Chatbot />} />
              </Routes>
              <Chatbot />
            </Container>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;