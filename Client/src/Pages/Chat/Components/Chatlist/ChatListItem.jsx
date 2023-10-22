import React from "react";
import { Avatar, Badge } from "@mui/material";
import { ChatState } from "../../../../Context/ChatProvider";
import { getSender } from "../../../../Utils/functions";
import { formatTimestamp } from "../../../../Utils/date";

const ChatListItem = ({ chat, selectedChat, setselectedChat, loggedUser }) => {
  const { notification, setNotification } = ChatState();

  const sender = getSender(loggedUser, chat.users);

  const chatNotifications = notification.filter(
    (item) => item.chat._id === chat._id
  );

  //handleChat
  const handleChat = () => {
    setselectedChat(chat);
    setNotification((prevNotifications) =>
      prevNotifications.filter((item) => item.chat._id !== chat._id)
    );
  };

  return (
    <div
      onClick={handleChat}
      className={`flex items-center justify-between border-b px-4 py-4  cursor-pointer hover:shadow-inner ${
        selectedChat === chat ? "bg-[#ffff]" : "bg-[#f8f8fa]"
      }`}
    >
      <div className="flex items-center">
        <Avatar
          src={!chat.isGroupChat ? sender.image : ""}
          alt={"userImage"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-5">
          <span className="text-base">
            {!chat.isGroupChat ? sender.name : chat.chatName}
          </span>
          <p className="text-gray-400 text-sm">
            {chat.latestMessage ? chat.latestMessage.content : ''}
          </p>
        </div>
      </div>
      <div className="text-right flex flex-col">
        <span className="text-gray-400 text-sm">
          {formatTimestamp(
            chat.latestMessage ? chat.latestMessage.createdAt : chat.createdAt
          )}
        </span>
        <span className="text-sm font-normal mr-2">
          <Badge
            color="primary"
            badgeContent={chatNotifications.length}
          ></Badge>
        </span>
      </div>
    </div>
  );
};

export default ChatListItem;
