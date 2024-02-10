import "./App.css";
import { useState, useEffect } from "react";
import { Container, Toolbar, Typography, Box, Button } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ColorModeContext, useMode } from "./themes/MyTheme";

//Accounts
import Gallery from "./pages/Accounts/Gallery";
import AddGallery from "./pages/Accounts/AddGallery";
import EditPost from "./pages/Accounts/EditPost";
import EditUserDetails from "./pages/Accounts/EditUserdetails";
import ChangePassword from "./pages/Accounts/ChangePassword";
import UserReferralTracking from "./pages/Accounts/UserReferralTracking";
import UserProfile from "./pages/Accounts/UserProfile";
import ManageReferralTracking from "./pages/Accounts/ManageReferralTracking";
import ManageUsers from "./pages/Accounts/ManageUsers";
import Register from "./pages/Accounts/Register";
import Login from "./pages/Accounts/Login";
import ForgetPassword from "./pages/Accounts/ForgetPassword";
import ResetPassword from "./pages/Accounts/ResetPassword";
import ReferralPage from "./pages/Accounts/ReferralPage";
import http from "././http";
import Chatbot from "./pages/Components/Chatbot";
import UserContext from "./contexts/UserContext";
import * as jwtDecodeModule from "jwt-decode";

import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import AppBar from "./pages/Components/AdminAppBar"; // Adjust the path as needed

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecodeModule.jwtDecode(token);
        setUserRole(decoded["UserRole"]);
        if (decoded["UserRole"] === "superAdmin") {
          navigate("/adminHome"); // using React Router's navigate function
        }
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
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" className="AppBar">
              <Container>
                <Toolbar disableGutters={true}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      <strong>UPlay</strong>
                    </Typography>
                  </Link>
                  {/* <Link to="/userHome" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                    <Typography>Home</Typography>
                  </Link>
                  <Link to="/gallery" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                    <Typography>Image Gallery</Typography>
                  </Link>
                  <Link to="/referralPage" style={{ textDecoration: 'none', color: 'inherit', margin: '0 10px' }}>
                    <Typography>Referral Page</Typography>
                  </Link> */}
                  {userRole === "user" && (
                    <>
                      <Link
                        to="/userReferralTracking"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>User Referral Tracking</Typography>
                      </Link>
                      <Link
                        to="/changePassword"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Change Password</Typography>
                      </Link>
                    </>
                  )}
                  {userRole === "accountAdmin"  && (
                    <>
                      <Link
                        to="/manageReferralTracking"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Manage Referral Tracking</Typography>
                      </Link>
                      <Link
                        to="/manageUsers"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Manage Users</Typography>
                      </Link>
                    </>
                  )}
                  {userRole === "Super Adminstrator" && (
                    <>
                      <Link
                        to="/manageRewards"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Manage Rewards</Typography>
                      </Link>
                      <Link
                        to="/manageReferralTracking"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Manage Referral Tracking</Typography>
                      </Link>
                      <Link
                        to="/manageUsers"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>Manage Users</Typography>
                      </Link>
                    </>
                  )}

                  <Box sx={{ flexGrow: 1 }}></Box>
                  {user ? (
                    <>
                      <Link
                        to="/userProfile"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          marginRight: "10px",
                        }}
                      >
                        <Typography
                          component="div"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <AccountCircleIcon sx={{ marginRight: 1 }} />
                          <strong>@{user.username}</strong>
                        </Typography>
                      </Link>
                      <Button onClick={logout} color="inherit">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                    
                      <Link
                        to="/register"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>REGISTER</Typography>
                      </Link>
                      <Link
                        to="/login"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          margin: "0 10px",
                        }}
                      >
                        <Typography>LOGIN</Typography>
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
                <Route
                  path={"/editUserDetails/:id"}
                  element={<EditUserDetails />}
                />
                <Route path={"/changePassword"} element={<ChangePassword />} />
                <Route path={"/forgetPassword"} element={<ForgetPassword />} />
                <Route path={"/resetPassword"} element={<ResetPassword />} />
                <Route
                  path={"/userReferralTracking"}
                  element={<UserReferralTracking />}
                />
                <Route path={"/referralPage"} element={<ReferralPage />} />
                <Route path={"/userProfile"} element={<UserProfile />} />
                <Route path={"/manageUsers"} element={<ManageUsers />} />
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
            </Container>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
