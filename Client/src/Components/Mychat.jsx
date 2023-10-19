import { Chat, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import chatApi from "../Services/chatApi";
import ChatListItem from "./Chatlist/ChatListItem";
import { getSender } from "../config/chatLogic";

const Mychat = () => {
  const [Query, setQuery] = useState("");
  const { User, selectedChat, notification, setselectedChat, Chats, setChats } =
    ChatState(); //context state
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

      if (User && User.token) {
        try {
          const data = await chatApi.fetchChats(User.token);
          setChats(data);
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  console.log(selectedChat, "sele");
  console.log(Chats, "jjj");

  const filteredChats = Chats.filter((chat) =>
    chat.isGroupChat
      ? chat.chatName.toLowerCase().includes(Query.toLowerCase())
      : getSender(User, chat.users).name.toLowerCase().includes(Query.toLowerCase())
  );

  return (
    <div className=" border-r p-5">
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
      <div className="">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              loggedUser={loggedUser}
              selectedChat={selectedChat}
              setselectedChat={setselectedChat}
            />
          ))
        ) : (
          <div>No matching chats found.</div>
        )}
      </div>
    </div>
  );
};

export default Mychat;
