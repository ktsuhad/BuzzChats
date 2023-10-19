import { MoreVertTwoTone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

const ChatuserBox = ({ selectedChat, sender, setShowProfile, showProfile }) => {
  return (
    <div
      className=" border-b-2 flex items-center justify-between py-3"
      onClick={() => setShowProfile(!showProfile)}
    >
      <div className="flex items-center gap-3 ">
        <Avatar src={!selectedChat.isGroupChat ? sender.image : ""} />
        <div className="flex flex-col ">
          <span className="text-base font-bold">
            {!selectedChat.isGroupChat ? sender.name : selectedChat.chatName}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22674a]" />
            <span className="text-sm text-[#adacbd]">Active</span>
          </span>
        </div>
      </div>
      <div>
        <MoreVertTwoTone /> {/* more icon */}
      </div>
    </div>
  );
};

export default ChatuserBox;
