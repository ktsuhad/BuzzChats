import React, { useEffect, useState } from "react";
import Signup from "../Components/Authentication/Signup";
import Login from "../Components/Authentication/Login";
import { Box, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to switch to the "Login" tab
  const switchToLogin = () => {
    setValue(1);
  };

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("userInfo"));

    if (User) navigate("/chats"); //if user then goto the chats page
  }, [navigate]);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="auth tabs">
          <Tab label="Signup" />
          <Tab label="Login" />
        </Tabs>
      </Box>

      {value === 0 ? <Signup switchToLogin={switchToLogin} /> : <Login />}
    </div>
  );
};

export default Homepage;
