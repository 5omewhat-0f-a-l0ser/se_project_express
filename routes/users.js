const router = require("express").Router();
const { getCurrentUser, updateUser, } = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/user", auth, getCurrentUser);
router.get("/user", auth, updateUser);



module.exports = router;