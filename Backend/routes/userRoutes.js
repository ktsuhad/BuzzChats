const express = require("express");
const { registerUser, loginUser } = require("../contoller/userControllers");
const upload = require("../middleware/multer");

const router = express.Router();

router.route("/").post(upload.single("image"), registerUser);
router.post("/login", loginUser);

module.exports = router;
