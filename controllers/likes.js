const BadRequestError = require("../errors/Error400");
const NotFoundError = require("../errors/Error404");

const ClothingItem = require("../models/clothingItems");
const { DEFAULT, BAD_REQUEST, NOT_FOUND } = require("../utils/Errors");
// const SuccessReturn = require("../utils/Status200");

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message $:err.message`);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid request"))
      }
      if (err.name === "DocumentNotFoundError") {
       return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(`Error ${err.name} with the message $:err.message`);
        if (err.name === "CastError") {
        return next(new BadRequestError("Invalid request"))
      }
      if (err.name === "DocumentNotFoundError") {
       return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

module.exports = { likeItem, dislikeItem };
