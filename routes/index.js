const NotFoundError = require("../utils/Error404");


const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");

const likeRouter = require("./likes")

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.use("/items", likeRouter);

router.use((req, res) => {
   console.error(NotFoundError("Route not found."))
});

module.exports = router;