const ClothingItem = require("../models/clothingItems");
const BadRequestError = require("../utils/Error400");
const NotFoundError = require("../utils/Error404");
const SuccessReturn = require("../utils/Status200");


const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .orFail()
  .then((item) => res.status(SuccessReturn).send(item))
  .catch((err) => {
    console.error(`Error ${err.name} with the message $:err.message`);
     if (err.name === "DocumentNotFoundError") {
      return res.status(NotFoundError).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    if (err.name === "BadRequestError") {
      return res.status(BadRequestError).send({ message: "Bad Request: Turns out, the server did not like that." });
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
  .then((item) => res.status(SuccessReturn).send(item))
  .catch((err) => {
    console.error(`Error ${err.name} with the message $:err.message`);
     if (err.name === "DocumentNotFoundError") {
      return res.status(NotFoundError).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
    if (err.name === "BadRequestError") {
      return res.status(BadRequestError).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { likeItem, dislikeItem }