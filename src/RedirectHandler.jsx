// RedirectHandler.jsx
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is imported
import UserContext from './contexts/UserContext'; // Adjust the import path as necessary

const RedirectHandler = () => {
  const navigate = useNavigate();
  const { setUser, setUserRole } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
console.log(decoded); // Check the structure of the decoded token

        setUserRole(decoded.UserRole); // Assuming the role is stored in the token
        setUser({
          id: decoded.nameid,
          firstName: decoded.given_name,
          lastName: decoded.family_name, // Ensure this matches the property name in your UserProfile component or adjust accordingly
          username: decoded.name, // You already have this
          email: decoded.email,
          contactNumber: decoded.Contact,
          address1: decoded.Address1,
          address2: decoded.Address2,
          referralCode: decoded.ReferralCode,
        });
        

        // Redirect based on user role
        if (decoded.userRole === 'superAdmin') {
          navigate('/adminHome');
        }
        // You can add more role-based redirects here
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate, setUser, setUserRole]);

  return null; // This component doesn't render anything
};

export default RedirectHandler;
