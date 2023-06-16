const express = require("express");

const authController = require("../controllers/auth");
const { check, body } = require("express-validator");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .custom((email) => {
        // if (value === "admin@shop.com") {
        //   throw new Error("This email address is only for admin");
        // }
        // return true;
        return UserModel.findOne({ email }).then((user) => {
          if (user) {
            return Promise.reject("Email already in used !!");
          }
        });
      }),
    body(
      "password",
      "Please fill passwod with only numbers and text and atleast 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body(
      "confirmPassword",
      "Please fill passwod with only numbers and text and atleast 5 characters"
    ).custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

// for reset the password
// router.get("/reset", authController.getReset);

module.exports = router;
