const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");

const likeRouter = require("./likes")

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.use("/items", likeRouter);

module.exports = router;