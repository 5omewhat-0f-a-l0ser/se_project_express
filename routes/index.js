const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");

const { login, createUser } = require("../controllers/users");

const {NOT_FOUND} = require("../utils/Errors");

const likeRouter = require("./likes")

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.use("/items", likeRouter);

router.use((req, res) => res.status(NOT_FOUND).send({ message: "Not Found: Um, you sure this exists?" }));

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;