import React from "react";
import { ChatState } from "../Context/ChatProvider";
import Mychat from "../Components/Mychat";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/miscellaneous/SideDrawer";

const Chatpage = () => {
  const { User } = ChatState();

  return (
    <div className="bg-[#f8f8fa] w-screen ">
      <div className="container mx-auto flex min-h-screen ">
        <SideDrawer/>
        <Mychat />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chatpage;
