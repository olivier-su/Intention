const router = require("express").Router();

const { getFood } = require("./foodHandlers");

router.get("/api/food", getFood);

module.exports = router;
