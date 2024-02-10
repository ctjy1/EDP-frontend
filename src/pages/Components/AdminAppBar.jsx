// import AppBarMaterial from "@mui/material/AppBar"; // Renamed import to avoid conflict
// import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for routing
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
// import React, { useEffect, useState, useContext } from "react";
// import UserContext from "../../contexts/UserContext";
// import * as jwtDecodeModule from "jwt-decode";

// function AdminAppBar() {
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       try {
//         const decoded = jwtDecodeModule.jwtDecode(token);
//         setUserRole(decoded["UserRole"]);
//         if (decoded["UserRole"] === "superAdmin") {
//           navigate("/adminHome"); // using React Router's navigate function
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, [user]); // You might need to adjust the dependency array

//   console.log("UserRole:", userRole); // Debugging: Check userRole value

//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
//     <AppBar position="static" className="AppBar">
//       <Container>
//         <Toolbar disableGutters={true}>
//           <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               <strong>UPlay</strong>
//             </Typography>
//           </Link>
//           {/* <Link
//             to="/userHome"
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               margin: "0 10px",
//             }}
//           >
//             <Typography>Home</Typography>
//           </Link>
//           <Link
//             to="/gallery"
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               margin: "0 10px",
//             }}
//           >
//             <Typography>Image Gallery</Typography>
//           </Link>
//           <Link
//             to="/referralPage"
//             style={{
//               textDecoration: "none",
//               color: "inherit",
//               margin: "0 10px",
//             }}
//           >
//             <Typography>Referral Page</Typography>
//           </Link> */}
//           {userRole === "user" && (
//             <>
//               <Link
//                 to="/userReferralTracking"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>User Referral Tracking</Typography>
//               </Link>
//               <Link
//                 to="/changePassword"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Change Password</Typography>
//               </Link>
//             </>
//           )}
//           {(userRole === "accountAdmin" || userRole === "superAdmin") && (
//             <>
//               <Link
//                 to="/manageReferralTracking"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Manage Referral Tracking</Typography>
//               </Link>
//               <Link
//                 to="/manageUsers"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Manage Users</Typography>
//               </Link>
//             </>
//           )}
//           {userRole === "Super Adminstrator" && (
//             <>
//               <Link
//                 to="/manageRewards"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Manage Rewards</Typography>
//               </Link>
//               <Link
//                 to="/manageReferralTracking"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Manage Referral Tracking</Typography>
//               </Link>
//               <Link
//                 to="/manageUsers"
//                 style={{
//                   textDecoration: "none",
//                   color: "inherit",
//                   margin: "0 10px",
//                 }}
//               >
//                 <Typography>Manage Users</Typography>
//               </Link>
//             </>
//           )}

// <Box sx={{ flexGrow: 1 }}></Box>
// {user && user.username ? ( // Check if user exists and has username
//   <>
//     <Link
//       to="/userProfile"
//       style={{
//         textDecoration: "none",
//         color: "inherit",
//         marginRight: "10px",
//       }}
//     >
//       <Typography
//         component="div"
//         style={{ display: "flex", alignItems: "center" }}
//       >
//         <AccountCircleIcon sx={{ marginRight: 1 }} />
//         <strong>@{user.username}</strong>
//       </Typography>
//     </Link>
//     <Button onClick={logout} color="inherit">
//       Logout
//     </Button>
//   </>
// ) : (
//   <>
//     <Link
//       to="/register"
//       style={{
//         textDecoration: "none",
//         color: "inherit",
//         margin: "0 10px",
//       }}
//     >
//       <Typography>REGISTER</Typography>
//     </Link>
//     <Link
//       to="/login"
//       style={{
//         textDecoration: "none",
//         color: "inherit",
//         margin: "0 10px",
//       }}
//     >
//       <Typography>LOGIN</Typography>
//     </Link>
//   </>
// )}


//         </Toolbar>
//       </Container>
//     </AppBar>
//     </UserContext.Provider>
//   );
// }

// export default AdminAppBar;
