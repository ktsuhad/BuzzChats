import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [User, setUser] = useState(); //userInfo
  const [selectedChat, setselectedChat] = useState(); //selected chat
  const [Chats, setChats] = useState([]); // chats
  const [notification, setNotification] = useState([]); // notification

  const navigate = useNavigate();

  useEffect(() => {
    const Userinfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(Userinfo);

    if (!Userinfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        User,
        setUser,
        selectedChat,
        setselectedChat,
        Chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
