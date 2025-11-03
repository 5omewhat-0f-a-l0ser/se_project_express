const NotFoundError = require("../errors/Error404");
const router = require("express").Router();

const userRouter = require("./users");

const clothingRouter = require("./clothingitems");

const { login, createUser } = require("../controllers/users");
const {
  userInfoBodyValidation,
  loginValidation,
} = require("../middlewares/validation");

router.use("/users", userRouter);

router.use("/items", clothingRouter);

router.post("/signin", loginValidation, login);
router.post("/signup", userInfoBodyValidation, createUser);

router.use((req, res, next) => next(new NotFoundError("Document not found")));

module.exports = router;
