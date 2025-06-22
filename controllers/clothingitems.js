const ClothingItem = require("../models/clothingItems");

const BadRequestError = require("../utils/Error400");
const InternalError = require("../utils/Error500");
const SuccessReturn = require("../utils/Status200");
const CreationReturn = require("../utils/Status201");
const NoContentReturn = require("../utils/Status204");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(SuccessReturn).send(items))
  .catch((err) => {
    if (err.name === "InternalError") {
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
    };
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
        return res.status(BadRequestError).send({ message: err.message });
      }
      return res.status(InternalError).send({ message: err.message });
    });
};
//videos had us do an Update controller and I find out, we don't need it!?

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(NoContentReturn).send({}))
  .catch(() => {
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem }