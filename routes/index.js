const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const captchaSecretKey = process.env.CAPTCHA_SECRET_KEY;









router.get('/test', (req, res) => {
  res.render('test-form');
});

router.post('/test', async (req, res) => {
  // Data received from a form with recaptcha
  console.log('REQ.BODY: \n', req.body);
  console.log('REQ.CONNECTION.REMOTEADDRESS: \n', req.connection.remoteAddress);

  // const captcha = req.body['g-recaptcha-response'];    // If data comes-in from form submit
  const captcha = req.body.captcha;                    // If data comes-in from fetch
  console.log('captcha: \n', captcha);
  if(!captcha) {
    return res.json({ success: false, message: "Please select captcha" });
  }

  // Secret Key
  const secretKey = "6LcM8tYZAAAAAGlfF4sLptdM6TeK55IgyJK3DqSe";

  // Verify URL (Constcruct a request for google recaptcha api)
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret="
     + secretKey 
     //  + "&response=" + req.body['g-recaptcha-response']       // If data comes-in from form submit
     + "&response=" + req.body.captcha                         // If data comes-in from fetch
     + "&remoteip=" + req.connection.remoteAddress;

     console.log('VERIFY URL: ', verifyUrl);

  // Make Request to VerifyURL (Send to google and await verification response)
  const body = await fetch(verifyUrl).then(res => res.json());
  // Response
  console.log('Response from google: \n', body);
  /* {
      success: true,
      challenge_ts: '2020-10-21T15:27:33Z',
      hostname: 'localhost'
    } */

  // If not successful
  if(body.success !== undefined && !body.success) {
    return res.json({ success: false, message: "Failed captca verification" });
  }
  // If Successful
  if(body.success === true) {
    return res.json({ success: true, message: "Captcha passed" });
  }
  // Otherwise
  return res.json({ success: false, message: "Captca verification unavailable" });
});










// Homepage
router.get("/", (req, res) => {
  res.render("index");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {

  if(!req.body.captcha) {
    return res.json({ message: "Please select captcha" });
  }

  // Verify URL
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + captchaSecretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;

  // Make Request to VerifyURL
  const body = await fetch(verifyUrl).then(res => res.json());

  // If not successful
  if(body.success !== undefined && !body.success) {
    return res.json({ message: "Failed captca verification" });
  }

  // If Successful
  res.json({ success: true, message: "Captcha passed" });

  const newUser = new User({ username: req.body.username });

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