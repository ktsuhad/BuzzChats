const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

//comparing password
userModel.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//has password
userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);
module.exports = User;
