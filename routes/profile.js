const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Movie = require('../models/movie');
const passport = require("passport");
const axios = require("axios");

// Profile
router.get("/profile/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    let data;

    const owmapi = process.env.OWMAPI;
    const lat = 39.749407;
    const lon = 64.420079;
    const units = "metric" // "metric", "imperial", "kelvin" by 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${owmapi}`;

    // If no weather API response within 2s, then continue w/o the data
    setTimeout(() => {
      if(!data){
        console.log("data is still empty: ");
        Movie.find({ 'author.username': user.username }, (err, movies) => {
          return res.render('users/profile', { locale: req.eval_language, user: user, movies: movies, data: data });
        });
      }
    }, 2000);
    
    // Get movie and weather data
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(url);
        data = resp.data;
        Movie.find({ 'author.username': user.username }, (err, movies) => {
          res.render('users/profile', { locale: req.eval_language, user: user, movies: movies, data: data });
        });
      } catch (err) {  console.error(err); }
    };

    sendGetRequest();
  });
});

module.exports = router;