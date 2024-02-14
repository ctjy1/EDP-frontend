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

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate, setUser, setUserRole]);

  return null; // This component doesn't render anything
};

export default RedirectHandler;
