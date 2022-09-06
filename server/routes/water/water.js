const router = require("express").Router();

const { getWater, updateWater } = require("./waterHandlers");

router.post("/api/get-water", getWater);
router.post("/api/water", updateWater);

module.exports = router;
