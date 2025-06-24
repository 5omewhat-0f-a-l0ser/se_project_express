const ClothingItem = require("../models/clothingItems");
const DEFAULT = require("../utils/Errors");
const BAD_REQUEST = require("../utils/Errors");
const SuccessReturn = require("../utils/Status200");
const CreationReturn = require("../utils/Status201");
const NoContentReturn = require("../utils/Status204");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(SuccessReturn).send(items))
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

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CreationReturn).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(DEFAULT).send({ message: err.message });
    });
};
//videos had us do an Update controller and I find out, we don't need it!?

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItem.findByIdAndDelete(itemId)
  .orFail(() => {
    const error = new Error("Item ID not found");
    error.statusCode = 404;
    throw error;
})
  .then((item) => res.status(SuccessReturn).send({ message: "Success!" }))
  .catch(() => {
    return res.status(DEFAULT).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem }