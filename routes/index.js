const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      console.log("user registered...");
      res.redirect("/movies");
    });
  });
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/movies",
  failureRedirect: "/login"
}), (req, res) => {
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  console.log('user logged out');
  res.redirect("/");
});

module.exports = router;