const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const passport = require("passport");

// Signup
router.route("/signup")
  .get(userController.createSignupForm)
  .post(userController.signup);

// Login
router.route("/login")
  .get(userController.createLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    userController.loginHome
  );

module.exports = router;
