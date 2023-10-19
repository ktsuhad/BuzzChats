import { Avatar } from "@mui/material";
import React from "react";
import ScrollableFeed from 'react-scrollable-feed'
import { isSameUser } from "../../config/chatLogic";

const MessageList = ({Messages ,User}) => {

  return (
    <ScrollableFeed>
      {Messages.map((message, index) => (
        <div
          key={message._id}
          className={`mt-5 ${
            message.sender._id === User._id ? "text-right" : ""
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              message.sender._id === User._id ? "text-right justify-end" : ""
            }`}
          >
            <Avatar
              src={message.sender.image}
              className={`${message.sender._id === User._id ? "order-3" : ""}`}
            />
            <div className="flex flex-col ">
              <div
                className={`flex items-center gap-2 ${
                  message.sender._id === User._id ? "justify-end" : ""
                }`}
              >
                <span className="text-sm font-medium">
                  {message.sender._id !== User._id ? message.sender.name :"You"}
                </span>
                <span className="text-sm text-[#adacbd]">8.00 PM</span>
              </div>
              <div
                className={`px-4 py-2  ${
                  message.sender._id === User._id
                    ? "bg-[#706afd] w-max pr-8 order-3 text-white rounded-tl-2xl rounded-tr-none rounded-br-2xl rounded-bl-2xl"
                    : "bg-[#f2f2f6] w-max text-[#7c769f] rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default MessageList;
