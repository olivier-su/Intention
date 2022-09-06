const router = require("express").Router();

const { getWater, updateWater } = require("./waterHandlers");

router.post("/api/water", getWater);
router.patch("/api/water", updateWater);

module.exports = router;
