const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.js");
const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to server");
  })
  .catch((e) => console.error(e));



  app.listen(3001, () => {
  console.log(`Listening on ${PORT}`);
});