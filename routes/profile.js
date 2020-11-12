const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Movie = require('../models/movie');
const passport = require("passport");

// Profile
router.get("/profile/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    
    // Get movie and weather data
    const sendGetRequest = async () => {
      try {
        Movie.find({ 'author.username': user.username }, (err, movies) => {
          res.render('users/profile', { locale: req.eval_language, user: user, movies: movies });
        });
      } catch (err) {  console.error(err); }
    };

    sendGetRequest();
  });
});

module.exports = router;