const express = require("express");
const fetch = require('node-fetch');
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

router.post("/register", async (req, res) => {

  // console.log(req.body);
  
  const secretKey = process.env.CAPTCHA_SECRET_KEY;

  if(!req.body.captcha) {
    return res.json({ message: "Please select captcha" });
  }

  // Verify URL
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;

  // Make Request to VerifyURL
  const body = await fetch(verifyUrl).then(res => res.json());

  // If not successful
  if(body.success !== undefined && !body.success) {
    return res.json({ message: "Failed captca verification" });
  }


  // If Successful
  res.json({ success: true, message: "Captcha passed" });

  // console.log(req.body.username);
  // console.log(req.body.password);

  const newUser = new User({ username: req.body.username });
  console.log(newUser);
  console.log(req.body.password);
  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("THIS CRAZY ERROR", err);
      // return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      console.log("user registered...");
      // res.redirect("/movies");
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