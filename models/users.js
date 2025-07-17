const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("user", userSchema);