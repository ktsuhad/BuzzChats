const express = require("express");
const {registerUser,
loginUser,allUsers,} = require("../contoller/userControllers");
const upload = require("../middleware/multer");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(upload.single("image"), registerUser).get(protect, allUsers);
router.post("/login", loginUser);

module.exports = router;
