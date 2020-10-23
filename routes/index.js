const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const passport = require("passport");
const { check, validationResult } = require('express-validator');
const User = require("../models/user");
const captchaSecretKey = process.env.CAPTCHA_SECRET_KEY;


// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post('/register', [
  // Check Username
  check('username', 'Email is not valid')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isLength({ min: 7 })
    .withMessage('Email should be 7+ characters')
    .isEmail()
    .bail()
    .trim()
    .normalizeEmail()
    .withMessage('Not a valid email address')
    // Check if exists in the database
    .custom(email => {
      return User.findOne({ email }).then((user) => {
        // console.log(user.email);
        if (user) {
          return Promise.reject('Email already in use');
        }
      });
    }),
  // Check Password
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be at least 6 chars')
], async (req, res) => {
  const captcha = req.body['g-recaptcha-response'];
  let errors = [];

  if(!captcha) {
    console.log("Please select captcha");
    errors.push("Please select captcha");
    return res.render('register', { errors });
  }

  // Verify URL (Constcruct a request for google recaptcha api)
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret="
    + captchaSecretKey 
    + "&response=" + captcha
    + "&remoteip=" + req.connection.remoteAddress;

  // Make Request to VerifyURL (Send to google and await verification response)
  const body = await fetch(verifyUrl).then(res => res.json());
  // Response
  console.log('Response from google: \n', body);

  // If not successful
  if(body.success !== undefined && !body.success) {
    console.log("Failed captca verification");
    errors.push("Failed captca verification");
    return res.render('register', { errors });
  }

  console.log("Captcha passed....");
  // User create and login
  const newUser = new User({ username: req.body.username, email: req.body.username });
  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("User registration failed, ", err);
      errors.push(err);
      return res.render('register', { errors });
    }
    console.log("User registered....");
    passport.authenticate("local")(req, res, () => {
      console.log("user logged in....");
      return res.redirect("/");
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

// Check if Email present in database
router.post('/usercheck', [  
  check('email', 'Email is not valid')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isLength({ min: 7 })
    .isEmail()
    .normalizeEmail()
    .withMessage('Not a valid email address')
    .custom(email => {
      return User.findOne({ email }).then((user) => {
        // console.log(user.email);
        if (user) {
          return Promise.reject('Email already in use');
        }
      });
    }), 
  ], (req, res) => {
  // Output express-validator results
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.json({ message: errors.mapped().email.msg });
  }
  res.json({ message: 'success' });
});

module.exports = router;