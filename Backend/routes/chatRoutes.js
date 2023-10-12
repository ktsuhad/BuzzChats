const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../contoller/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats); // get all chats the particular user
router.route("/group").post(protect, createGroupChat); //create group chat
router.route("/rename").put(protect, renameGroup); // rename groups
router.route("/groupadd").put(protect, addToGroup); // add a new user to group
router.route("/groupremove").put(protect, removeFromGroup); // remove user from group

module.exports = router;
