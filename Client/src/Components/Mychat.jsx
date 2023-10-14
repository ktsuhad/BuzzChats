import { Chat, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import chatApi from "../Services/chatApi";
import ChatListItem from "./Chatlist/ChatListItem";

const Mychat = () => {
  const [Query, setQuery] = useState();
  const { User, selectedChat, setselectedChat, Chats, setChats } = ChatState(); //context state
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

      if (User && User.token) {
        try {
          const data = await chatApi.fetchChats(User.token);
          setChats(data);
          console.log(data);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }
    };

    fetchData();
  }, [User, setChats]);

  return (
    <div className="flex-1 border-r p-5">
      <div className="flex items-center justify-between py-5">
        <span className="text-xl font-bold">Messages</span>
        <Chat /> {/* chat icon */}
      </div>
      <div className="w-full flex items-center justify-between border rounded-2xl mt-2 px-4 ">
        <input
          type="text"
          placeholder="Search"
          value={Query}
          className="w-full h-8  outline-none  bg-transparent"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search /> {/* search icon */}
      </div>
      <div>
        {Chats
          ? Chats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                onclick={() => setselectedChat(chat)}
                loggedUser={loggedUser}
                selectedChat={selectedChat}
              />
            ))
          : "No chats"}
      </div>
    </div>
  );
};

export default Mychat;
