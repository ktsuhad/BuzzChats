import React from "react";
import { formatTimestamp, getSender } from "../../config/chatLogic";
import { Avatar, Badge } from "@mui/material";

const ChatListItem = ({ chat, onclick, selectedChat, loggedUser }) => {
  const sender = getSender(loggedUser, chat.users);

  return (
    <div
      onClick={onclick}
      className={`flex items-center justify-between border-b px-4 py-4  cursor-pointer hover:shadow-inner ${
        selectedChat === chat ? "bg-[#ffff]" : "bg-[#f8f8fa]"
      }`}
    >
      <div className="flex items-center">
        <Avatar 
          src={!chat.isGroupChat ? sender.image : chat.groupAdmin.image}
          alt={"userImage"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-5">
          <span className="text-base">
            {!chat.isGroupChat ? sender.name : chat.chatName}
          </span>
          <p className="text-gray-400 text-sm">hi good morning</p>
        </div>
      </div>
      <div className="text-right flex flex-col">
        <span className="text-gray-400 text-sm">
          {formatTimestamp(chat.createdAt)}
        </span>
        <span className="text-sm font-normal mr-2">
          <Badge color="primary" badgeContent={2} showZero></Badge>
        </span>
      </div>
    </div>
  );
};

export default ChatListItem;
