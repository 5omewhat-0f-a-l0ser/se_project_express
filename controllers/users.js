const User = require("../models/users");
const DEFAULT = require("../utils/Errors");
const BAD_REQUEST = require("../utils/Errors");
const NOT_FOUND = require("../utils/Errors");
const SuccessReturn = require("../utils/Status200");
const CreationReturn = require("../utils/Status201");

//GET /users

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.send(users))
 .catch(() => {
  return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
 })
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
  .then((user) => res.status(CreationReturn).send(user))
  .catch((err) =>{
    console.error(`Error ${err.name} with the message $:err.message`);
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    if (err.name === "DocumentNotFoundError") {
      return res.status(NOT_FOUND).send({ message: "Not Found: Um, you sure this exists?"})
    }
    return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId)
  .orFail(() => {
    const error = new Error("Item ID not found");
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.status(SuccessReturn).send(user))
  .catch ((err) => {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    if (err.name === "DocumentNotFoundError") {
      return res.status(NOT_FOUND).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};


module.exports = { getUsers, createUser, getUser };