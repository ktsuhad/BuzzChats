import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import {
  CalendarMonthOutlined,
  KeyboardArrowDownOutlined,
  MarkChatUnreadOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import Lottie from "react-lottie";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/chatLogic";
import messageApi from "../../Services/messageApi";
import { toast } from "react-toastify";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatuserBox from "./ChatUserBox";
import animationData from "../../Animations/typing.json";
import io from "socket.io-client"; //socket io client

const ENDPOINT = "http://localhost:5000/";
var socket, selectedChatCompare;

const ChatBox = () => {
  const { User, selectedChat } = ChatState(); //context state
  const [Messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setsocketConnected] = useState(false); //socket connection true or false
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);

  let sender = null;

  if (selectedChat) {
    sender = getSender(User, selectedChat.users);
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMId slice",
    },
  };

  //connection on socket client
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("setup", User);
    socket.on("connected", () => setsocketConnected(true));
    socket.on("typing", () => setisTyping(true));
    socket.on("stop typing", () => setisTyping(false));
  }, []);

  //fetching all messages
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const data = await messageApi.fetchAllMessages(
        selectedChat._id,
        User.token
      );
      setMessages(data);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Give notification or handle differently
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    });
  }, [selectedChatCompare, Messages]);

  //typingHandler   || onchange event
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing indicator logic
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  //message sending function
  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const data = await messageApi.sendChat(
          newMessage,
          selectedChat._id,
          User.token
        );
        socket.emit("new message", data); // Emit a "new message" event to the server

        setMessages([...Messages, data]);
        setNewMessage("");
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
          {isTyping ? (
            <div>
              <Lottie
                options={defaultOptions}
                width={70}
                style={{ marginBottom: 15, marginLeft: 0 }}
              />
            </div>
          ) : (
            <></>
          )}
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
          onchange={typingHandler}
        />
      )}
    </div>
  );
};

export default ChatBox;
