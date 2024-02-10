import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import "../../App.css";
import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import UserContext from "../../contexts/UserContext";
import * as jwtDecodeModule from "jwt-decode";
import RedirectHandler from '../../RedirectHandler';


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/userHome",
    },
    {
      text: "Activities",
      icon: <InfoIcon />,
      link: "/activities",
    },
    {
      text: "Gallery",
      icon: <CommentRoundedIcon />,
      link: "/gallery",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "/contact",
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      link: "/cart",
    },
  ];
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate(); // Define the navigate function

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecodeModule.jwtDecode(token);
        setUserRole(decoded["UserRole"]);
        if (decoded["UserRole"] === "Super Adminstrator") {
          navigate("/adminHome"); // Navigate to adminHome
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [userRole, navigate]); // Adjust the dependency array

  console.log("UserRole:", userRole);
  
  console.log("Username:", user?.username);


  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
      
    {userRole === "user" && (
  <>
       <Link to="/userHome">Home</Link>
           <Link to="/">Activities</Link>
           <Link to="/Gallery">Gallery</Link>
           <Link to="/">Contact</Link>
   <Link to="/userProfile">@{user?.username}</Link>
    <button onClick={logout}>Logout</button>

   
  </>
)}
{user && (
<>
<Typography>{user.name}</Typography>
<Button>Logout</Button>
</>
)
}
        {userRole == "Super Adminstrator" && (
          <>
           <Link to="/manageReferralTracking">Manage Referral Tracking</Link>
           <Link to="/manageUsers">Manage Users</Link>
           <Link to="/manageRewards">Manage Rewards</Link>
            <Link to="/userProfile">@{user.firstName}</Link> {/* Use optional chaining */}
    <button onClick={logout}>Logout</button>
          
          </>
        )}
{userRole !== "user" && userRole !== "Super Adminstrator" && (
  <>
   <Link to="/userHome">Home</Link>
           <Link to="/">Activities</Link>
           <Link to="/Gallery">Gallery</Link>
           <Link to="/">Contact</Link>
           <Link to="/register" className="primary-button" style={{ color: 'white', backgroundColor: 'red', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', border: 'none' }}>REGISTER</Link>
<Link to="/login" className="primary-button" style={{ color: 'white', backgroundColor: 'red', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', border: 'none', marginLeft: '-35px' }}>LOGIN</Link>

  </>
)}


      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
    </UserContext.Provider>
  );
};

export default Navbar;