const express = require("express");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters")
      .matches(/[a-z]/)
      .withMessage("Password should contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password should contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password should contain at least one number")
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)
      .withMessage("Password should contain at least one special character"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
