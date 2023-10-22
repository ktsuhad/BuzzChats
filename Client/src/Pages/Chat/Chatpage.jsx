import React, { useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import Mychat from "./Components/Mychat";
import SideDrawer from "../../Components/miscellaneous/SideDrawer";
import { useNavigate } from "react-router-dom";
import ChatBox from "./Components//Chatbox/ChatBox";

const Chatpage = () => {
  const { User } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate("/");
    }
  }, [User, navigate]);

  if (!User) {
    return null; // Render nothing until the user is authenticated
  }

  return (
    <div className="bg-[#f8f8fa] w-screen ">
      <div className="container mx-auto flex min-h-screen ">
        <SideDrawer style={{ width: "20%" }} />
        <Mychat style={{ width: "30%" }} />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chatpage;
