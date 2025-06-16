const ClothingItem = require("../models/clothingItems");

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
       return res.status(400).send({ message: err.message });
     }
     return res.status(500).send({ message: err.message });
   });
};

const updateClothingItems = (req,res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;
  console.log(itemId, imageURL)
    ClothingItem.findByIdAndUpdate(itemId, {$set: {imageUrl}})
  .orFail()
  .then((item) => res.status(200).send({data:item}))
  .catch((err) => {
    return res.status(500).send({ message: err.message });
  })
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(204).send({}))
  .catch((err) => {
   return res.status(500).send({ message: err.message });
  })
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem, updateClothingItems }