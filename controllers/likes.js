const ClothingItem = require("../models/clothingItems");
const { DEFAULT, BAD_REQUEST, NOT_FOUND } = require("../utils/Errors");
// const SuccessReturn = require("../utils/Status200");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message $:err.message`);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: "Bad Request: Turns out, the server did not like that.",
          });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Not Found: Boss, this user couldn't be found" });
      }
      return res
        .status(DEFAULT)
        .send({
          message:
            "Internal Server Error: Are you sure you didn't break the server?",
        });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message $:err.message`);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: "Bad Request: Turns out, the server did not like that.",
          });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Not Found: Boss, this user couldn't be found" });
      }
      return res
        .status(DEFAULT)
        .send({
          message:
            "Internal Server Error: Are you sure you didn't break the server?",
        });
    });
};

module.exports = { likeItem, dislikeItem };
