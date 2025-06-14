const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const clothingRouter = require("./routes/clothingitems");
const mainRouter = require("./routes/index")
const app = express();

app.use(express.json());

const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to server");
  })
  .catch((e) => console.error(e));


app.use("/", mainRouter);

app.listen(3001, () => {
  console.log(`Listening on ${PORT}`);
});