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
import Logo from "./assets/Logo.png";

// Import pages
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


// Bookings pages
import Carts from './pages/Bookings/Carts';
import AddCart from './pages/Bookings/AddCart';
import EditCart from './pages/Bookings/EditCart';
import Checkout from './pages/Bookings/Checkout';
import CheckoutSuccess from './pages/Bookings/CheckoutSuccess';
import Orders from './pages/Bookings/Orders';
import UserOrders from './pages/Bookings/UserOrders';
import SetBudget from './pages/Bookings/SetBudget';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

  // Define different colors for different user roles
  const getColorForRole = (role) => {
    switch (role) {
      case "user":
        return "white"; //  color for regular users
      case "Account Manager":
        return "#28a745"; //  color for account managers
      case "Super Adminstrator":
        return "black"; //  color for super administrators
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
        return "#28a745"; //  color for account managers
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
    color: getLinkColorForRole(userRole), // Set link color based on user role
    textDecoration: 'none', // Remove underline from links
    margin: '0 10px', // Add margin to links
  };

  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      <Router>
        <RedirectHandler setUser={setUser} setUserRole={setUserRole} /> {/* Ensure RedirectHandler is used correctly */}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" className="AppBar" style={appBarStyle} elevation={0}>
              <Container>
                <Toolbar disableGutters={true}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      
                    >
                      <img src={Logo} alt="" />
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

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
                    {userRole === "user" && (
                      <>
                        <Link
                          to="/userReferralTracking"
                          style={linkStyle}
                        >
                          <Typography>User Referral Tracking</Typography>
                        </Link>
                        <Link
                          to="/changePassword"
                          style={linkStyle}
                        >
                          <Typography>Change Password</Typography>
                        </Link>
                        <Link to="/addcart" style={linkStyle}><Typography>Add Cart</Typography></Link>
                        <Link to="/setbudget" style={linkStyle}><Typography>Set Budget</Typography></Link>
                        <Link to="/userorders" style={linkStyle}><Typography>My Orders</Typography></Link>

                        <Link to="/checkout"><ShoppingCartIcon sx={{color: 'black'}}/></Link>
                      </>
                    )}
                    {userRole === "Account Manager" && (
                      <>
                        <Link
                          to="/manageReferralTracking"
                          style={linkStyle}
                        >
                          <Typography>Manage Referral Tracking</Typography>
                        </Link>
                        <Link
                          to="/manageUsers"
                          style={linkStyle}
                        >
                          <Typography>Manage Users</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Super Adminstrator" && (
                      <>
                        <Link
                          to="/manageRewards"
                          style={linkStyle}
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
                          style={linkStyle}
                        >
                          <Typography>Manage Users</Typography>
                        </Link>
                        <Link to="/carts"><Typography>Carts</Typography></Link>
                        <Link to="/orders"><Typography>Orders</Typography></Link>
                      </>
                    )}
                  </Box>

                  <Box sx={{ flexGrow: 1 }}></Box>
                  {user ? (
                    <>
                      <Link
                        to="/userProfile"
                        style={linkStyle}
                      >
                        <Typography
                          component="div"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <AccountCircleIcon sx={{ marginRight: 1 }} />
                          <strong>@{user.username}</strong>
                        </Typography>
                      </Link>
                      <LogoutButton/>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        style={linkStyle}
                      >
                        <Typography>REGISTER</Typography>
                      </Link>
                      <Link
                        to="/login"
                        style={linkStyle}
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


                {/* Carts Routes for user side*/}
                <Route path={"/addcart"} element={<AddCart />} />
                <Route path={"/editcart/:id"} element={<EditCart />} />
                <Route path={"/checkout"} element={<Checkout />} />
                <Route path={"/checkoutsuccess"} element={<CheckoutSuccess />} />
                <Route path={"/userorders"} element={<UserOrders />} />
                <Route path={"/setbudget"} element={<SetBudget />} />


                {/* Carts Routes for admin side */}
                <Route path={"/carts"} element={<Carts />} />
                <Route path={"/orders"} element={<Orders />} />



              </Routes>
            </Container>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
