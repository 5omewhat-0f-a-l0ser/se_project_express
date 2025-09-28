const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

const corsOptions = {
  origin: "http://localhost:3000", // allow React dev server
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
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
