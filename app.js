require('dotenv').config();

const { errors } = require('celebrate');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errors")

const { requestLogger, errorLogger } = require('./middlewares/logger');



const app = express();

const { PORT = 3001 } = process.env;

const corsOptions = {
  origin: ["http://localhost:3000", "https://weatherapp.rainbowcup.com"], // allow React dev server
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};



mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")

  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(cors(corsOptions));

app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
