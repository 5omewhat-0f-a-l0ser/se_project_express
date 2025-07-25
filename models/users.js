const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  DUPLICATE,
  UNAUTHORIZED,
} = require("../utils/Errors");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "A valid URL is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL",
    },
  },
  // project 13
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please provide a vaild email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials =
async function findByCredentials(
  email,
  password
) {
  const user = await this.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return
    throw new Error("Incorrect email, please try again");
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
   return
   throw new Error ("Incorrect email, please try again");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
