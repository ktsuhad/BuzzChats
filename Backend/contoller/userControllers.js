const User = require("../Model/userModel");
const { Cloud } = require("../config/cloudinary");
const generateToken = require("../config/generateToken");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let imageUrl;

  if (!image) {
    imageUrl =
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"; // Default image URL
  }

  const imageStream = await Cloud.uploader.upload(image.path, {
    folder: "BuzzChats/userImages",
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  });
  imageUrl = imageStream.secure_url;

  // Find existing user
  const existingUser = await User.findOne({ email });

  // If exists
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    image: imageUrl,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      token: generateToken(newUser._id), // Access token
    });
  } else {
    res.status(500);
    throw new Error("Error in registering");
  }
};

//loginUser
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email }); // Find user

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};


//seraching user      /api/user?search=suhad
const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("error in searching user",error);
  }
};



module.exports = { registerUser, loginUser, allUsers };
