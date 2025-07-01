const User = require("../models/users");
const { DEFAULT, BAD_REQUEST, NOT_FOUND} = require("../utils/Errors");
// GET /users

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.send(users))
 .catch(() =>res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" }))
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
  .then((user) => res.status(201).send(user))
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
  User.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch ((err) =>{
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