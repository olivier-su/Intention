const router = require("express").Router();

const { getTask, addTask, deleteTask } = require("./taskHandlers");

router.post("/api/get-task", getTask);
router.post("/api/task", addTask);
router.delete("/api/task", deleteTask);

module.exports = router;
