const express = require("express");

const authController = require("../controllers/auth");
const { check } = require('express-validator');

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post("/signup", check('email').isEmail(),authController.postSignup);

router.post("/logout", authController.postLogout);

// for reset the password
// router.get("/reset", authController.getReset);

module.exports = router;
