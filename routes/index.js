const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");

const { login, createUser } = require("../controllers/users");

const { NOT_FOUND } = require("../utils/Errors");

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) =>
  res
    .status(NOT_FOUND)
    .send({ message: "Not Found: Um, you sure this exists?" })
);

module.exports = router;
