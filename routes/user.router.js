const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const userController = require("../controller/users.controller");
const check = require("../middleware/validation/validationcontroller/user.validation");

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    error:
      "Too many login attempts from this IP, please try again after 1 minutes.",
  },
});

router.post("/signup", userController.signUp);
router.post(
  "/login",
  check.loginValidation,
  loginLimiter,
  userController.login
);

module.exports = router;
