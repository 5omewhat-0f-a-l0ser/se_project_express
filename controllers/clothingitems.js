const ClothingItem = require("../models/clothingItems");
const { DEFAULT, BAD_REQUEST, NOT_FOUND} = require("../utils/Errors");
// const SuccessReturn = require("../utils/Status200");
// const CreationReturn = require("../utils/Status201");
// const NoContentReturn = require("../utils/Status204");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(DEFAULT).send({ message: err.message });
    });
};
// videos had us do an Update controller and I find out, we don't need it!?

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then(() => res.status(200).send({message: "You got it! I'll get this out of your way!"}))
  .catch((err) => {
    if (err.name === "DocumentNotFoundError") {
      return res.status(NOT_FOUND).send({ message: "Not Found: Boss, this user couldn't be found"});
    }
   if (err.name === "CastError") {
      return res.status(BAD_REQUEST).send({ message: err.message });
    }
    return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem }