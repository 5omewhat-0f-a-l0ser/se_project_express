const Clothing = require("../models/clothingItems");

const getClothingItems = (req, res) => {
  Clothing.find({})
  .then((items) => res.status(200).send(items))
  .catch((err) => {
    console.error(err);
  });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageURL } = req.body;
 Clothing.create({ name, weather, imageURL })
   .then((items) => res.status(201).send(items))
   .catch((err) =>{
     console.error(err);
     if (err.name === "ValidationError") {
       return res.status(400).send({ message: err.message });
     }
     return res.status(500).send({ message: err.message });
   });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;


}

module.exports = { getClothingItems, createClothingItem }