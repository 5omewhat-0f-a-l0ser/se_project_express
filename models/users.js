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

userSchema.statics.findUserByCredentials =
function findByCredentials(
  email,
  password
) {
  const user = this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Incorrect email or password");
  }
  const matched = bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error("Incorrect email or password");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
