const express = require("express");
const protect = require("../middleware/authMiddleware");
const { sendMessage, allMessage } = require("../contoller/messageController");

const router = express.Router();

router.route("/").post(protect, sendMessage ); //message posting
router.route("/:chatId").get(protect, allMessage);  //getting all messages

module.exports = router;
