const User = require("../models/users");

//const Error400 = require("../utils/Error400");
//const Error500 = require("../utils/Error500");
//const Error404 = require("../utils/Error404");
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
  .then((user) => res.status(201).send(user))
  .catch((err) =>{
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err.message });
  });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch ((err) => {
    if (err.name === "") {
      return res.status(400).send({ message: err.message});
    }
    return res.status(500).send({ message: err.message});
  });
};

module.exports = { getUsers, createUser, getUser };