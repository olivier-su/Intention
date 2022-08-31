const router = require("express").Router();

const { getFood, addFood, updateFood, deleteFood } = require("./foodHandlers");
const { getCalories } = require("./caloriesHandlers");

router.post("/api/dailyFood", getFood);
router.post("/api/food", addFood);
router.patch("/api/food", updateFood);
router.delete("/api/food", deleteFood);

router.post("/api/calories", getCalories);

module.exports = router;
