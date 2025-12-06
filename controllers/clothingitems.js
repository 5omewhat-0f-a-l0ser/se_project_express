const ClothingItem = require("../models/clothingItems");
const BadRequestError = require("../errors/badrequest-error");
const NotFoundError = require("../errors/notfound-error");
const ForbiddenError = require("../errors/forbidden-error");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next)
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("The id string is in an invalid format"));
      }
      return next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      if (item.owner.toString() !== req.user._id) {
       return next(new ForbiddenError("You are not supposed to even have this item."));
      }
      return ClothingItem.deleteOne({ _id: req.params.itemId }).then(() => {
        res.status(200).send({message:"Item deleted successfully"});
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Not Found: Boss, this user couldn't be found" ));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("The id string is in an invalid format"));
      }
      return next(err);
    });
};

module.exports = { getClothingItems, createClothingItem, deleteClothingItem };
