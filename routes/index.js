const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// Index
router.get("/", (req, res) => {
  res.redirect("/movies");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err) => {
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
  res.redirect("/movies");
});

module.exports = router;  