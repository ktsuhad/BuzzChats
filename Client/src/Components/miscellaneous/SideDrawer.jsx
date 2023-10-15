import {
  GroupsOutlined,
  HomeOutlined,
  LogoutOutlined,
  PollOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const SideDrawer = () => {
  const { setUser } = ChatState(); //context state

  //logout function
  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Clear user data from localStorage
    setUser(null); // Clear user data in the context
  };

  return (
    <div className="flex items-center">
      <div className="bg-[#6362fb] text-white h-[98%] shadow-md rounded-3xl px-2 py-7">
        <h1 className="text-xl font-bold">BuzzChat</h1>
        <ul className="text-center mt-8 space-y-10">
          <li className=" cursor-pointer rounded-full hover:translate-x-3 duration-300">
            <HomeOutlined fontSize="medium" />
          </li>
          <li className=" cursor-pointer rounded-full hover:translate-x-3 duration-300">
            <PollOutlined fontSize="medium" />
          </li>
          <li className=" cursor-pointer rounded-full hover:translate-x-3 duration-300">
            <GroupsOutlined fontSize="medium" />
          </li>
          <li
            onClick={handleLogout}
            className=" cursor-pointer rounded-full hover:translate-x-3 duration-300"
          >
            <LogoutOutlined fontSize="medium" />
          </li>
          <li className=" cursor-pointer rounded-full hover:translate-x-3 duration-300">
            <SettingsOutlined fontSize="medium" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;
