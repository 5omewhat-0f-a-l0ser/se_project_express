const ClothingItem = require("../models/clothingItems");

const BadRequestError = require("../utils/Error400");
const InternalError = require("../utils/Error500");
//const NotFoundError = require("../utils/Error404");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    if (err.name === "InternalError") {
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
    };
  });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
 ClothingItem.create({ name, weather, imageUrl })
   .then((item) => res.status(201).send({data:item}))
   .catch((err) =>{
     console.error(err);
     if (err.name === "ValidationError") {
      return res.status(BadRequestError).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};

//videos had us do an Update controller and I find out, we don't need it!?

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(204).send({}))
  .catch(() => {
    return res.status(InternalError).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem }