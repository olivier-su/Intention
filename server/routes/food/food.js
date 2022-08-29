const router = require("express").Router();

const { getFood, addFood } = require("./foodHandlers");

router.get("/api/food", getFood);
router.post("/api/food", addFood);

module.exports = router;
