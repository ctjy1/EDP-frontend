import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Header from "../../components/Header";
import http from "../../http";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import UserSidebar from "./global/UserSidebar";

function ReferralPage() {
  const [userList, setUserList] = useState([]);
  const { user, setUser } = useContext(UserContext); // Assuming setUser is available to update the context
  const location = useLocation(); // Use location to detect navigation changes

  const getUsers = () => {
    http
      .get("/Users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        // Handle the error appropriately in your UI
      });
  };

  useEffect(() => {
    // Check if user is not null and location.state.refresh is true
    if (user && location.state?.refresh) {
      http
        .get(`/User/${user.id}`)
        .then((res) => {
          setUser(res.data); // Update UserContext with the new data
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [location, setUser, user]);
  // Updated CSS converted to inline styles for neater content box
  const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      width: "350px",
      maxWidth: "90%", // Ensure it doesn't exceed the width of the screen
      height: "auto", // Adjust height automatically based on content
      backgroundColor: "orange",
      paddingTop: "20px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
      overflow: "hidden",
      margin: "20px auto", // Center the box on the page
    },
    ellipse: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px 20px 130px 130px",
      backgroundColor: "red",
      width: "100%", // Take the full width of the box
      margin: "0",
      padding: "20px 0", // Padding top and bottom
    },
    ellipseP: {
      textTransform: "uppercase",
      color: "#fff",
      marginBottom: "20px", // Space before the icon
    },
    button: {
      marginTop: "20px",
      backgroundColor: "orangered",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
  };

  const handleCopyCode = () => {
    if (user && user.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
        .then(() => alert("Referral code copied to clipboard"))
        .catch(error => console.error('Error copying to clipboard:', error));
    }
  };

  return (
    <div className="app">
      <UserSidebar />
      <main className="content">
        <Box m="20px">
          <Box mt="20px" sx={{ textAlign: "center" }}>
            <Header
              title="Invite a friend!"
              sx={{
                textDecoration: "none", // Assuming you want to keep text decoration to none for now
                textAlign: "center",
              }}
            />
            {/* Adding a Box just for the underline effect, centered and with limited width */}
            <Box
              sx={{
                width: "120px", // Adjust this width as needed to match the text width
                height: "3px",
                backgroundColor: "red",
                margin: "0 auto", // This centers the box
              }}
            ></Box>
          </Box>

          <div style={styles.box}>
            <Box sx={styles.ellipse}>
              <Typography variant="body1" sx={styles.ellipseP}>
                <strong>Get 100 points! </strong>{" "}
              </Typography>
              <CardGiftcardIcon style={{ fontSize: 60, color: "white" }} />
            </Box>
            {user && (
              <>
                <Typography>{user.Username}</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginTop: "20px", textAlign: "center" }}
                >
                  @{user.username}'s referral code
                </Typography>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  {user.referralCode}
                </Typography>

                <Button variant="contained" style={styles.button} onClick={handleCopyCode}>
                  Copy code
                </Button>
              </>
            )}
          </div>
        </Box>
        <Box p="500px 0"> </Box>
      </main>
    </div>
  );
}

export default ReferralPage;
