const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskController = require("../controller/task.controller");
const check = require("../middleware/validation/validationcontroller/task.validation");

router.post(
  "/create-task",
  auth,
  check.taskCreateValidation,
  taskController.create
);
router.get("/tasks", auth, taskController.get);
router.patch(
  "/tasks/:taskId",
  auth,
  check.taskUpdateValidation,
  taskController.update
);
router.delete("/tasks/:taskId", auth, taskController.delete);

module.exports = router;
