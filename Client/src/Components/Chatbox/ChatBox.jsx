import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import {
  CalendarMonthOutlined,
  KeyboardArrowDownOutlined,
  MarkChatUnreadOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/chatLogic";
import messageApi from "../../Services/messageApi";
import { toast } from "react-toastify";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatuserBox from "./ChatUserBox";

import io from "socket.io-client"; //socket io client

const ENDPOINT = "http://localhost:5000/";
var socket, selectedChatCompare;

const ChatBox = () => {
  const { User, selectedChat } = ChatState(); //context state
  const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  let sender = null;

  if (selectedChat) {
    sender = getSender(User, selectedChat.users);
  }

  //fetching all messages
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const data = await messageApi.fetchAllMessages(
        selectedChat._id,
        User.token
      );
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  //message sending function
  const sendMessage = async () => {
    if (newMessage) {
      try {
        const data = await messageApi.sendChat(
          newMessage,
          selectedChat._id,
          User.token
        );
        setNewMessage("");
        setMessages([...Messages, data]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex-[3] h-screen flex flex-col p-5 ">
      {/* User Profile Section */}
      <div className="flex items-center gap-6 justify-end p-5">
        <CalendarMonthOutlined />
        <NotificationsNoneOutlined />
        <MarkChatUnreadOutlined />
        <div className="flex items-center">
          <Avatar src={User.image} sx={{ width: "50px", height: "50px" }} />
          <KeyboardArrowDownOutlined />
        </div>
      </div>

      {/* Chat Messages Section */}
      {selectedChat ? (
        <div className="bg-[#ffff] flex-grow overflow-y-auto p-5 relative">
          {/* user profile and active nav */}
          <ChatuserBox selectedChat={selectedChat} sender={sender} />

          {/* //message list component */}
          <MessageList Messages={Messages} User={User} />
        </div>
      ) : (
        <div className="flex items-center justify-center bg-[#ffff] flex-grow rounded-xl p-5">
          Select a chat to start messaging.
        </div>
      )}

      {/* Message Input Section */}
      {selectedChat && (
        <MessageInput
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}
    </div>
  );
};

export default ChatBox;
