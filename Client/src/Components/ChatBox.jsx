import React from "react";
import { Avatar } from "@mui/material";
import {
  CalendarMonthOutlined,
  HighlightOff,
  ImageOutlined,
  KeyboardArrowDownOutlined,
  MarkChatUnreadOutlined,
  MoreVertTwoTone,
  NotificationsNoneOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../config/chatLogic";

const ChatBox = () => {
  const { User, selectedChat } = ChatState(); //context state
  let sender = null;

  if (selectedChat) {
    sender = getSender(User, selectedChat.users);
  }

  // Sample data for chat messages (replace with your actual data) 
  const chatMessages = [
    { sender: "Tina", message: "Hi, how are you?" },
    { sender: "You", message: "I'm good, thanks! How about you?" },
    {
      sender: "Tina",
      message: "I'm doing great. What have you been up to?",
    },
    {
      sender: "You",
      message: "then?",
    },
    {
      sender: "Tina",
      message: "I love you 😍",
    },
    {
      sender: "You",
      message: "Love you too 😍😍",
    },
  ];

  return (
    <div className="flex-[3] flex flex-col p-5">
      {/* User Profile Section */}
      <div className="flex items-center gap-6 justify-end p-5">
        <CalendarMonthOutlined />
        <NotificationsNoneOutlined />
        <MarkChatUnreadOutlined />
        <div className="flex items-center">
          <Avatar src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
          <KeyboardArrowDownOutlined />
        </div>
      </div>

      {/* Chat Messages Section */}
      {selectedChat ? (
        <div className="bg-[#ffff] h-full rounded-xl flex-grow overflow-y-auto p-5 relative">
          {/* user profile and active nav */}
          <div className="border-b-2 flex items-center justify-between py-3">
            <div className="flex items-center gap-3 ">
              <Avatar src={!selectedChat.isGroupChat ? sender.image : ""} />
              <div className="flex flex-col ">
                <span className="text-base font-bold">
                  {!selectedChat.isGroupChat
                    ? sender.name
                    : selectedChat.chatName}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22674a]" />
                  <span className="text-sm text-[#adacbd]">Active</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full flex items-center justify-between border rounded-2xl mt-2 px-4 bg-[#f8f8fa]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-8 outline-none bg-transparent"
                />
                <HighlightOff /> {/* search icon */}
              </div>
              <MoreVertTwoTone /> {/* more icon */}
            </div>
          </div>

          <div className="mt-10">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={` ${message.sender === "You" ? "text-right" : ""}`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    message.sender === "You" ? "text-right justify-end" : ""
                  }`}
                >
                  <Avatar
                    className={` ${message.sender === "You" ? "order-3" : ""}`}
                  />
                  <div className="flex flex-col ">
                    <div
                      className={`flex items-center gap-2 ${
                        message.sender === "You" ? "justify-end" : ""
                      }`}
                    >
                      <span className="font-bold">{message.sender}</span>
                      <span className="text-sm text-[#adacbd]">8.00 PM</span>
                    </div>
                    <div
                      className={`px-4 py-2 ${
                        message.sender === "You"
                          ? "bg-[#706afd] order-3 text-white rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-2xl"
                          : "bg-[#f2f2f6] text-[#7c769f] rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Section */}
          <div className="flex mt-4 absolute bottom-5  left-5 right-5">
            <div className="w-full flex items-center bg-[#f7f6fb] rounded-lg p-2">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full outline-none bg-transparent"
              />
              <div className="flex items-center gap-5">
                <span className="p-2 hover:bg-gray-400 rounded-full">
                  <ImageOutlined />
                </span>
                <span className="p-2 hover:bg-gray-400 rounded-full">
                  <SendOutlined />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-[#ffff] h-full rounded-xl p-5 ">
          Select a chat to start messaging.
        </div>
      )}
    </div>
  );
};

export default ChatBox;
