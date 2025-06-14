const router = require("express").Router();

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems)
router.post("/", ()=> console.log("POST items"));
router.delete("/:itemId", ()=> console.log("DELETE items by ID"));

module.exports = router;