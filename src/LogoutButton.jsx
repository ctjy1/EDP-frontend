// LogoutButton.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import UserContext from './contexts/UserContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser, setUserRole } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserRole("");
    navigate('/');
  };

  return <Button onClick={logout} color="inherit">Logout</Button>;
};

export default LogoutButton;
