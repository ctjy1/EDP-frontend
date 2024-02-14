import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Menu,
  MenuItem,
  AppBar,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { ExpandMore } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ExpandMore } from "@mui/icons-material";
import { ColorModeContext, useMode } from "./themes/MyTheme";
import UserContext from "./contexts/UserContext";
import * as jwtDecodeModule from "jwt-decode";
import Logo from "./assets/logo_uplay.png";

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
import ManageGallery from "./pages/Accounts/ManageGallery";
import Register from "./pages/Accounts/Register";
import Login from "./pages/Accounts/Login";
import ForgetPassword from "./pages/Accounts/ForgetPassword";
import ResetPassword from "./pages/Accounts/ResetPassword";
import ReferralPage from "./pages/Accounts/ReferralPage";
import Calendar from "./pages/Accounts/Calendar";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import Chatbot from "./pages/Components/Chatbot";


//Feedback and Survey
import Feedback from './pages/Feedback';
import Surveys from './pages/Surveys';
import Tickets from './pages/Tickets';
import AddFeedback from './pages/AddFeedback';
import AddSurvey from './pages/AddSurvey';
import AddTicket from './pages/AddTicket';
import FAQPage from './pages/FAQ';

// Bookings pages
import Carts from "./pages/Bookings/Carts";
import AddCart from "./pages/Bookings/AddCart";
import EditCart from "./pages/Bookings/EditCart";
import Checkout from "./pages/Bookings/Checkout";
import CheckoutSuccess from "./pages/Bookings/CheckoutSuccess";
import Orders from "./pages/Bookings/Orders";
import UserOrders from "./pages/Bookings/UserOrders";
import SetBudget from "./pages/Bookings/SetBudget";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookingChart from "./pages/Bookings/BookingChart";

// Import Reward pages
import Rewards from './pages/Rewards/Rewards';
import AddReward from './pages/Rewards/AddReward';
import EditReward from './pages/Rewards/EditReward';
import MoreRewards from './pages/Rewards/MoreRewards';
import ManageRewards from './pages/Rewards/ManageRewards';
import ManageMoreRewards from './pages/Rewards/ManageMoreRewards';
import ManageDeletedRewards from './pages/Rewards/ManageDeletedRewards';
import ManageUsedRewards from "./pages/Rewards/ManageUsedRewards";

import ViewReward from "./pages/Rewards/ViewReward";


// Assuming RedirectHandler is properly defined in './RedirectHandler'
import RedirectHandler from "./RedirectHandler";
import http from "./http";
import LogoutButton from "./LogoutButton";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get("/user/auth").then((res) => {
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
    fontSize: "200px",
    display: "flex", // Use flexbox for layout
    justifyContent: "center", // Center the links horizontally
    alignItems: "center",
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ color: "orangered" }}
                    >
                      <img
                        src={Logo}
                        alt=""
                        style={{
                          width: "95px",
                          height: "28px",
                          paddingLeft: "13px",
                        }}
                    </Typography>
                  </Link>
{/* 
                  <Box
                    sx={{
                      display: "flex",
                      paddingLeft: '200px',
                      justifyContent: "right",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Link to="/" style={linkStyle}>
                      <Typography>Home</Typography>
                    </Link>

                    <Link to="/" style={linkStyle}>
                      <Typography>Activities</Typography>
                    </Link>


                    <Link to="/gallery" style={linkStyle}>
                      <Typography>Gallery</Typography>
                    </Link>

                    <Link to="/faq" style={linkStyle}>
                      <Typography>FAQ</Typography>
                    </Link>
                  </Box> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    {userRole === "user" && (
                      <>
                        <Link to="/" style={linkStyle}>
                          <Typography>Home</Typography>
                        </Link>

                        <Link to="/" style={linkStyle}>
                          <Typography>Activities</Typography>
                        </Link>

                        <Link to="/gallery" style={linkStyle}>
                          <Typography>Gallery</Typography>
                        </Link>

                        <Link
                          to="#"
                          aria-controls="menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography style={{ marginRight: "4px" }}>
                            Carts
                          </Typography>
                          <ExpandMore />
                        </Link>
                        <Menu
                          id="menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link to="/addcart">
                              <Typography color="white">Add Cart</Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/setbudget">
                              <Typography color="white">Set Budget</Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/userorders">
                              <Typography color="white">My Orders</Typography>
                            </Link>
                          </MenuItem>
                        </Menu>

                        <Link
                          to="#"
                          aria-controls="support-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Typography style={{ marginRight: "4px" }}>
                            Support
                          </Typography>
                          <ExpandMore />
                        </Link>
                        <Menu
                          id="support-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link to="/feedbackForm">
                              <Typography color="white">
                                Add Feedback
                              </Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/surveyForm">
                              <Typography color="white">Add Survey</Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/ticketForm">
                              <Typography color="white">Add Ticket</Typography>
                            </Link>
                          </MenuItem>
                        </Menu>

                        <Link to="/checkout">
                          <ShoppingCartIcon sx={{ color: "black" }} />
                        </Link>
                      </>
                    )}
                    {userRole === "Account Manager" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Manage Users</Typography>
                        </Link>
                        <Link to="/manageAdmin" style={linkStyle}>
                          <Typography>Manage Adminstrators</Typography>
                        </Link>
                        <Link to="/manageReferralTracking" style={linkStyle}>
                          <Typography>Manage Referral Tracking</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Bookings Manager" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Manage Carts</Typography>
                        </Link>
                        <Link to="/manageAdmin" style={linkStyle}>
                          <Typography>Manage Orders</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Feedback Manager" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Manage Feedbacks</Typography>
                        </Link>
                        <Link to="/manageAdmin" style={linkStyle}>
                          <Typography>Manage Surveys</Typography>
                        </Link>
                        <Link to="/manageReferralTracking" style={linkStyle}>
                          <Typography>Manage Tickets</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Rewards Manager" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Manage Rewards</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Activity Manager" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Manage Actvities</Typography>
                        </Link>
                      </>
                    )}
                    {userRole === "Super Adminstrator" && (
                      <>
                        <Link to="/manageUsers" style={linkStyle}>
                          <Typography>Accounts</Typography>
                        </Link>
                        <Link to="/orders" style={linkStyle}>
                          <Typography>Bookings</Typography>
                        </Link>
                        <Link to="/manageRewards" style={linkStyle}>
                          <Typography>Activities</Typography>
                        </Link>
                        <Link to="/manageRewards" style={linkStyle}>
                          <Typography>Feedbacks</Typography>
                        </Link>
                        <Link to="/manageRewards" style={linkStyle}>
                          <Typography>Rewards</Typography>
                        </Link>
                      </>
                    )}
                  </Box>

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
                <Route path={"/manageGallery"} element={<ManageGallery />} />
                <Route path={"/calendar"} element={<Calendar />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/adminHome"} element={<AdminHome />} />
                <Route path={"/userHome"} element={<UserHome />} />
                <Route path={"/chatbot"} element={<Chatbot />} />


                
                <Route path={"/feedback"} element={<Feedback />} />
                <Route path={"/surveys"} element={<Surveys />} />
                <Route path={"/ticket"} element={<Tickets />} />
                <Route path={"/feedbackForm"} element={<AddFeedback />} />
                <Route path={"/FAQ"} element={<FAQPage />} />
                <Route path={"/surveyForm"} element={<AddSurvey />} />
                <Route path={"/ticketForm"} element={<AddTicket />} />

                {/* Carts Routes for user side*/}
                <Route path={"/addcart"} element={<AddCart />} />
                <Route path={"/editcart/:id"} element={<EditCart />} />
                <Route path={"/checkout"} element={<Checkout />} />
                <Route
                  path={"/checkoutsuccess"}
                  element={<CheckoutSuccess />}
                />
                <Route path={"/userorders"} element={<UserOrders />} />
                <Route path={"/setbudget"} element={<SetBudget />} />

                {/* Carts Routes for admin side */}
                <Route path={"/carts"} element={<Carts />} />
                <Route path={"/orders"} element={<Orders />} />
                <Route path={"/bookingchart"} element={<BookingChart />} />



                <Route path={"/manageRewards"} element={<ManageRewards/>} />
                <Route path={"/manageMoreRewards/:id"} element={<ManageMoreRewards/>} />
                <Route path={"/manageDeletedRewards"} element={<ManageDeletedRewards/>}/>
                <Route path={"/manageUsedRewards"} element={<ManageUsedRewards/>}/>
                <Route path={"/rewards"} element={<Rewards />} />
                <Route path={"/addreward"} element={<AddReward />} />
                <Route path={"/editreward/:id"} element={<EditReward />} />
                <Route path={"/morerewards/:id"} element={<MoreRewards />}/>

                <Route path={"/viewreward"} element={<ViewReward />} />
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
