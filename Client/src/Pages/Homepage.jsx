import React, { useState } from "react";
import Signup from "../Components/Authentication/Signup";
import Login from "../Components/Authentication/Login";
import { Box, Tabs, Tab } from "@mui/material";

const Homepage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to switch to the "Login" tab
  const switchToLogin = () => {
    setValue(1);
  };

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
