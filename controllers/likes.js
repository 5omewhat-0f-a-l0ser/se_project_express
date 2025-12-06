const BadRequestError = require("../errors/badrequest-error");
const NotFoundError = require("../errors/notfound-error");

const ClothingItem = require("../models/clothingItems");

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
