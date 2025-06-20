const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
   enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please enter a valid URL"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("clothingItem", clothingSchema);