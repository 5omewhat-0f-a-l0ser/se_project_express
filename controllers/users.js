const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const BadRequestError = require("../errors/badrequest-error");
const NotFoundError = require("../errors/notfound-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");

// Project 13
const { JWT_SECRET } = require("../utils/config");

// GET /users

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("missing email, please add one" ));
  }

  if (!password) {
    return next(new BadRequestError("missing password, please add one"));
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
        next(new BadRequestError("The id string is in an invalid format"));
      }
      if (err.name === "DuplicateError") {
        next(new ConflictError("The id string already exists"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User is not found"));
      }
      return next(err);
    });
};

// project 13
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("invalid email or password"));
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
      if (err.message === "Incorrect email, please try again") {
        return next(new UnauthorizedError("Incorret email or password, please try again"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("User cannot be updated"))
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
