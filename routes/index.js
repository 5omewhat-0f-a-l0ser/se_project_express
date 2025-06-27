const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");


const {NOT_FOUND} = require("../utils/Errors");

const likeRouter = require("./likes")

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.use("/items", likeRouter);

router.use((req, res) => {
   return res.status(NOT_FOUND).send({ message: "Not Found: Um, you sure this exists?" });
});

module.exports = router;