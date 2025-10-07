const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { userUpdateValidation } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, userUpdateValidation,updateUser);

module.exports = router;
