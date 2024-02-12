import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  AppBar,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ColorModeContext, useMode } from './themes/MyTheme';
import UserContext from './contexts/UserContext';
import * as jwtDecodeModule from 'jwt-decode';

// Import Account pages
import Gallery from './pages/Accounts/Gallery';
import AddGallery from './pages/Accounts/AddGallery';
import EditPost from './pages/Accounts/EditPost';
import EditUserDetails from './pages/Accounts/EditUserdetails';
import ChangePassword from './pages/Accounts/ChangePassword';
import UserReferralTracking from './pages/Accounts/UserReferralTracking';
import UserProfile from './pages/Accounts/UserProfile';
import ManageReferralTracking from './pages/Accounts/ManageReferralTracking';
import ManageUsers from './pages/Accounts/ManageUsers';
import Register from './pages/Accounts/Register';
import Login from './pages/Accounts/Login';
import ForgetPassword from './pages/Accounts/ForgetPassword';
import ResetPassword from './pages/Accounts/ResetPassword';
import ReferralPage from './pages/Accounts/ReferralPage';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import Chatbot from './pages/Components/Chatbot';

// Import Reward pages
import Rewards from './pages/Rewards/Rewards';
import AddReward from './pages/Rewards/AddReward';
import EditReward from './pages/Rewards/EditReward';
import MoreRewards from './pages/Rewards/MoreRewards';
import ManageRewards from './pages/Rewards/ManageRewards';
import ManageMoreRewards from './pages/Rewards/ManageMoreRewards';

import ViewReward from './pages/Rewards/ViewReward';

// Assuming RedirectHandler is properly defined in './RedirectHandler'
import RedirectHandler from './RedirectHandler';
import LogoutButton from './LogoutButton';

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate('/'); // Navigating to home page after logout
  };

  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <Router>
        <RedirectHandler setUser={setUser} setUserRole={setUserRole} /> {/* Ensure RedirectHandler is used correctly */}
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
                  {userRole === "Account Manager" && (
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
                      <LogoutButton />
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
                <Route
                  path={"/manageReferralTracking"}
                  element={<ManageReferralTracking />}
                />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/adminHome"} element={<AdminHome />} />
                <Route path={"/userHome"} element={<UserHome />} />
                <Route path={"/chatbot"} element={<Chatbot />} />

                <Route path={"/manageRewards"} element={<ManageRewards/>} />
                <Route path={"/manageMoreRewards/:id"} element={<ManageMoreRewards/>} />
                <Route path={"/rewards"} element={<Rewards />} />
                <Route path={"/addreward"} element={<AddReward />} />
                <Route path={"/editreward/:id"} element={<EditReward />} />
                <Route path={"/morerewards/:id"} element={<MoreRewards />}/>
                <Route path={"/viewreward"} element={<ViewReward />} />
              </Routes>
            </Container>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
