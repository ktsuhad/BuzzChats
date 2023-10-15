const Message = require("../Model/MessageModel");
const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

// message send || POST
const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      res.status(400).send("Invalid data passed into request");
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    let message = await Message.create(newMessage); //creating messages

    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat,users",
      select: "name image email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).send(message);
  } catch (error) {
    res.status(500).send("error in message send", error);
  }
};

// all messages
const allMessage = async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name , image , email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    res.json ("error in getting all message", error);
  }
};
module.exports = { sendMessage, allMessage };
