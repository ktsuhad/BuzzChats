import { ImageOutlined, SendOutlined } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";
import React from "react";

const MessageInput = ({ sendMessage, newMessage ,onchange}) => {
  return (
    <div className="flex mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="w-full flex items-center bg-[#f7f6fb] rounded-lg p-2"
      >
        <Input
          type="text"
          placeholder="Type a message"
          className="w-full outline-none bg-transparent"
          value={newMessage}
          onChange={onchange}
        />
        <div className="flex items-center gap-5">
          <IconButton onClick={sendMessage}>
            <SendOutlined />
          </IconButton>
          <IconButton>
            <ImageOutlined />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
