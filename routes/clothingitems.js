const router = require("express").Router();

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems)
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;