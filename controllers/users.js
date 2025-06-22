const User = require("../models/users");
const BadRequestError = require("../utils/Error400");
const InternalError = require("../utils/Error500");
const NotFoundError = require("../utils/Error404");
const SuccessReturn = require("../utils/Status200");
const CreationReturn = require("../utils/Status201");

//GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
 .catch((err) => {
  console.error(err);
 })
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
  .then((user) => res.status(CreationReturn).send(user))
  .catch((err) =>{
    console.error(err);
    if (err.name === "BadRequestError") {
      return res.status(BadRequestError).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    if (err.name === "NotFoundError") {
      return res.status(NotFoundError).send({ message: "Not Found: Um, you sure this"})
    }
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId)
  .orFail()
  .then((user) => res.status(SuccessReturn).send(user))
  .catch ((err) => {
    if (err.name === "NotFoundError") {
      return res.status(NotFoundError).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};


module.exports = { getUsers, createUser, getUser };