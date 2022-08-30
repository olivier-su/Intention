const router = require("express").Router();

const { getFood, addFood, updateFood, deleteFood } = require("./foodHandlers");

router.post("/api/dailyFood", getFood);
router.post("/api/food", addFood);
router.patch("/api/food", updateFood);
router.delete("/api/food", deleteFood);

module.exports = router;
