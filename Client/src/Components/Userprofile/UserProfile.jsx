import React from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import { Close } from "@mui/icons-material";

const UserProfile = ({ setShowProfile }) => {
  const { User } = ChatState();

  return (
    <div className="w-1/3 bg-white p-5 rounded-lg shadow-lg transition-all duration-500">
      <bitton className="hover:bg-gray-100 p-1 rounded-full" onClick={() => setShowProfile(false)}><Close/></bitton>
      <div className="flex flex-col items-center">
        <Avatar src={User.image} sx={{ width: "100px", height: "100px" }} />
        <Typography variant="h6" mt={2}>
          {User.name}
        </Typography>
        <Typography variant="body2" mt={1}>
          Email: {User.email}
        </Typography>
      </div>
    </div>
  );
};

export default UserProfile;
