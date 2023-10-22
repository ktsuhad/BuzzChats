import React, { useEffect, useState } from "react";
import { Avatar, Badge } from "@mui/material";
import {
  KeyboardArrowDownOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import Lottie from "react-lottie";
import { ChatState } from "../../../../Context/ChatProvider";
import messageApi from "../../../../Services/messageApi";
import { toast } from "react-toastify";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatuserBox from "./ChatUserBox";
import animationData from "../../../../Animations/typing.json";
import io from "socket.io-client"; //socket io client
import UserProfile from "../../../../Components/Userprofile/UserProfile";
import { getSender } from "../../../../Utils/functions";

const ENDPOINT = "http://localhost:5000/";
var socket, selectedChatCompare;

const ChatBox = () => {
  const { User, setselectedChat, selectedChat, notification, setNotification } =
    ChatState(); //context state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setsocketConnected] = useState(false); //socket connection true or false
  const [typing, setTyping] = useState(false);
  const [isTyping, setisTyping] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, [notification, selectedChatCompare, messages, setNotification]);

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
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  //clear Notifications messages
  const clearNotifications = () => {
    setNotification([]);
  };

  const handleNotificationClick = (notificationItem) => {
    setselectedChat(notificationItem.chat);
    setNotification(
      notification.filter((notify) => notify.chat._id !== chat._id)
    );
  };

  return (
    <div className={`flex-1 flex`}>
      <div
        className={`h-screen flex flex-col p-5 ${
          showProfile ? "w-3/4" : "w-full"
        }`}
      >
        {/* User Profile Section */}
        <div className="flex items-center gap-6 justify-end p-5">
          <div className="relative">
            <Badge color="secondary" badgeContent={notification.length}>
              <NotificationsNoneOutlined
                className="cursor-pointer"
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
              />
            </Badge>

            {/* show notification message */}
            {showNotificationPanel && (
              <div className="absolute w-max right-3 top-10 bg-white p-4 rounded-lg shadow-md z-10">
                <div className="text-lg font-semibold mb-4">Notifications</div>
                {notification.length === 0 ? (
                  <div className="text-gray-500">No new Messages.</div>
                ) : (
                  <ul>
                    {notification.map((notificationItem, index) => (
                      <li
                        key={notificationItem._id}
                        className="cursor-pointer text-black border-b py-3  hover:bg-black/5 hover:rounded-md"
                        onClick={() =>
                          handleNotificationClick(notificationItem)
                        }
                      >
                        {notificationItem.chat.isGroupChat
                          ? `New Message in ${notificationItem.chat.chatName}`
                          : `New Message in ${notificationItem.sender.name}`}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={clearNotifications}
                  className="bg-gray-200 mt-4 text-sm border px-4 py-1 rounded-md"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center cursor-pointer"
          >
            <Avatar src={User.image} sx={{ width: "50px", height: "50px" }} />
            <KeyboardArrowDownOutlined />
          </div>
        </div>

        {/* Chat Messages Section */}
        {selectedChat ? (
          <div className="bg-[#ffff] flex-grow overflow-y-auto p-5 relative">
            {/* user profile and active nav */}
            <ChatuserBox
              selectedChat={selectedChat}
              sender={sender}
              setShowProfile={setShowProfile}
              showProfile={showProfile}
            />

            {/* //message list component */}
            <MessageList Messages={messages} User={User} />
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
      {showProfile && <UserProfile setShowProfile={setShowProfile} />}
    </div>
  );
};

export default ChatBox;
