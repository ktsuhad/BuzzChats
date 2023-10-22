import { Chat, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { toast } from "react-toastify";
import chatApi from "../../../Services/chatApi";
import ChatListItem from "../Components/Chatlist/ChatListItem";
import { getSender } from "../../../Utils/functions";
import userApi from "../../../Services/userApi";
import ChatLoading from "../../../Components/Loading/ChatLoading";
import TextInput from "../../../Components/Inputs/Input";

const Mychat = () => {
  const [Query, setQuery] = useState("");
  const [UserSearchQuery, setUserSearchQuery] = useState("");

  const { User, selectedChat, setselectedChat, Chats, setChats } = ChatState(); //context state
  const [loggedUser, setLoggedUser] = useState();
  const [chatLoading, setchatLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true); // Introduce a new loading state for users

  const [showSearch, setShowSearch] = useState(false);
  const [users, setUsers] = useState([]);

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
        } finally {
          setchatLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (showSearch) {
        try {
          const data = await userApi.allUser(UserSearchQuery, User.token);
          setUsers(data);
        } catch (error) {
          console.error(error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUsers([]); // Clear the user list when the search container is hidden or the query is empty
      }
    };

    fetchUsers();
  }, [showSearch, UserSearchQuery, User.token]);

  //handle user click
  const handleUserClick = async (userId) => {
    try {
      const chat = await chatApi.accessChat(userId, User.token);
      // Check if the chat already exists in Chats
      const existingChatIndex = Chats.findIndex((c) => c._id === chat._id);
      if (existingChatIndex !== -1) {
        // Chat already exists, set it as the selected chat
        setselectedChat(Chats[existingChatIndex]);
      } else {
        // Chat is new, add it to the chat list and set it as the selected chat
        const updatedChats = [chat, ...Chats];
        setChats(updatedChats);
        setselectedChat(chat);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredChats = Chats.filter((chat) =>
    chat.isGroupChat
      ? chat.chatName.toLowerCase().includes(Query.toLowerCase())
      : getSender(User, chat.users)
          .name.toLowerCase()
          .includes(Query.toLowerCase())
  );

  console.log(users);
  return (
    <div className=" border-r p-7 relative">
      <div className="flex items-center justify-between py-5">
        <span className="text-xl font-bold">Messages</span>
        <Chat onClick={() => setShowSearch(!showSearch)} /> {/* chat icon */}
      </div>

      {showSearch ? (
        <div className={`${showSearch ? "block" : "hidden"}`}>
          <div className="w-full flex items-center justify-between border rounded-2xl mt-2 px-4 ">
            <TextInput
              value={UserSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              placeholder="Search"
            />
            <Search /> {/* search icon */}
          </div>
          <div className="user-list">
            {users.length === 0 && userLoading ? (
              <ChatLoading />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="user-item border-b"
                  onClick={() => handleUserClick(user._id)} // Add click handler to access chat
                >
                  <div className="user-avatar">
                    {user.image ? (
                      <img src={user.image} alt={user.name} />
                    ) : (
                      <div className="user-initials">{user.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      <div className={`${showSearch ? "hidden" : "block"}`}>
        <div className="w-full flex items-center justify-between border rounded-2xl mt-2 px-4 ">
          <TextInput
            value={Query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <Search /> {/* search icon */}
        </div>
        <div className="">
          {chatLoading ? (
            <ChatLoading />
          ) : filteredChats.length > 0 ? (
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
    </div>
  );
};

export default Mychat;
