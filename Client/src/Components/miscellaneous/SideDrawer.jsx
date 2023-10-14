import { GroupsOutlined, HomeOutlined , LogoutOutlined, PollOutlined, SettingsOutlined } from "@mui/icons-material";
import React from "react";

const SideDrawer = () => {
  return (
    <div className="flex items-center">
      <div className="bg-[#6362fb] text-white h-[98%] shadow-md rounded-3xl px-2 py-7">
        <h1 className="text-xl font-bold">BuzzChat</h1>
        <ul className="text-center mt-8 space-y-10">
          <li>
            <HomeOutlined fontSize="medium"/>
          </li>
          <li>
            <PollOutlined  fontSize="medium"/>
          </li>
          <li>
            <GroupsOutlined  fontSize="medium"/>
          </li>
          <li>
            <LogoutOutlined  fontSize="medium"/>
          </li>
          <li className="">
            <SettingsOutlined  fontSize="medium"/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;
