const ClothingItem = require("../models/clothingItems");
const Error400 = require("../utils/Error400");
const Error404 = require("../utils/Error404");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail()
  .then((item) => res.status(200).send(item))
  .catch((err) => {
    console.error(`Error ${err.name} with the message $:err.message`);
     if (err.name === "NotFoundError") {
      return res.status(Error404).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    if (err.name === "Validation Error") {
      return res.status(Error400).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail()
  .then((item) => res.status(200).send(item))
  .catch((err) => {
    console.error(`Error ${err.name} with the message $:err.message`);
     if (err.name === "NotFoundError") {
      return res.status(Error404).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    if (err.name === "Validation Error") {
      return res.status(Error400).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { likeItem, dislikeItem }