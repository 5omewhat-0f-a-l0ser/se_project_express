const router = require("express").Router();

const {
  likeItem,
  dislikeItem
} = require("../controllers/likes");

router.put("/", likeItem);
router.delete("/:itemId", dislikeItem);

module.exports = router;