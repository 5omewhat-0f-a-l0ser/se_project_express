const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      validate: {
        validator: (url) => validator.isURL(url),
        message: "Please provide a valid URL",
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a valid email"],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      select: false, // important: password won’t be returned by default
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);


userSchema.statics.findUserByCredentials =
async function findByCredentials(
  email,
  password
) {
  const user = await this.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    throw new Error("Incorrect email, please try again");
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
   throw new Error ("Incorrect email, please try again");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
