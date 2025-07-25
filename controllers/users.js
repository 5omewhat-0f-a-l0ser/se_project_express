const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {
  DEFAULT,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  DUPLICATE,
  UNAUTHORIZED,
} = require("../utils/Errors");
// Project 13
const { JWT_SECRET } = require("../utils/config");

// GET /users

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "missing email, please add one" });
  }

  if (!password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "missing password, please add one" });
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      console.error(`Error ${err.name} with the message: ${err.message}`);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Bad Request: Turns out, the server did not like that.",
        });
      }
      if (err.name === DUPLICATE) {
        return res
          .status(CONFLICT)
          .send({ message: "Conflict: Hmm... Something's not right here..." });
      }
      return res.status(DEFAULT).send({
        message:
          "Internal Server Error: Are you sure you didn't break the server?",
      });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Bad Request: Turns out, the server did not like that.",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Not Found: Boss, this user couldn't be found" });
      }
      return res.status(DEFAULT).send({
        message:
          "Internal Server Error: Are you sure you didn't break the server?",
      });
    });
};

// project 13
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "A valid Email and Password is needed" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(`Error ${err.name} with the message ${err.message}`);
      if (err.message === "incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password, please try again." });
      }
      if (err.name === DUPLICATE) {
        return res
          .status(CONFLICT)
          .send({ message: "Conflict: Hmm... Something's not right here..." });
      }
      return res.status(DEFAULT).send({
        message:
          "Internal Server Error: Are you sure you didn't break the server?",
      });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Bad Request: Turns out, the server did not like that.",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Not Found: Boss, this user couldn't be found" });
      }
      return res.status(DEFAULT).send({
        message:
          "Internal Server Error: Are you sure you didn't break the server?",
      });
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
