const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingitems");

const { likeItem, dislikeItem } = require("../controllers/likes");
const { clothingItemBodyValidation, idValidation} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, clothingItemBodyValidation, createClothingItem);
router.delete("/:itemId", auth, idValidation, deleteClothingItem);
router.put("/:itemId/likes",auth, idValidation, likeItem);
router.delete("/:itemId/likes", auth, idValidation, dislikeItem);

module.exports = router;
