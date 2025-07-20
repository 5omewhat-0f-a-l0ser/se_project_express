const ClothingItem = require("../models/clothingItems");
const {
  DEFAULT,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/Errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      return res
        .status(DEFAULT)
        .send({
          message:
            "Internal Server Error: Are you sure you didn't break the server?",
        });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: "Bad Request: Turns out, the server did not like that.",
          });
      }
      return res
        .status(DEFAULT)
        .send({
          message:
            "Internal Server Error: Are you sure you didn't break the server?",
        });
    });
};
// videos had us do an Update controller and I find out, we don't need it!?

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(req.params, itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      if (item.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN).json({ message: "Access denied" });
      }
      return ClothingItem.deleteOne({ _id: req.params.itemId });
    })
    // Is that how I'm supossed to do this?
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Not Found: Boss, this user couldn't be found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({
            message: "Bad Request: Turns out, the server did not like that.",
          });
      }
      return res
        .status(DEFAULT)
        .send({
          message:
            "Internal Server Error: Are you sure you didn't break the server?",
        });
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
