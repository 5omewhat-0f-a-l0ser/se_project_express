const ClothingItem = require("../models/clothingItems");

const Error400 = require("../utils/Error400");
const Error500 = require("../utils/Error500");
const Error404 = require("../utils/Error404");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    console.error(err);
  });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageURL } = req.body;
 ClothingItem.create({ name, weather, imageURL })
   .then((item) => res.status(201).send({data:item}))
   .catch((err) =>{
     console.error(err);
     if (err.name === "ValidationError") {
      return res.status(Error400).send({ message: "Bad Request: Turns out, the server did not like that." });
    }
    return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  });
};

const updateClothingItems = (req,res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;
  console.log(itemId, imageURL)
    ClothingItem.findByIdAndUpdate(itemId, {$set: {imageUrl}})
  .orFail()
  .then((item) => res.status(200).send({data:item}))
  .catch(() => {
   return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(204).send({}))
  .catch(() => {
    return res.status(Error500).send({ message: "Internal Server Error: Are you sure you didn't break the server?" });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem, updateClothingItems }