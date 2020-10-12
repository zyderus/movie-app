const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Movie = require('../models/movie');
const passport = require("passport");
const axios = require("axios");

// Profile
router.get("/profile/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {



    let owmapi = process.env.OWMAPI;
    let latitude = 39.749407;
    let longtitude = 64.420079;
    let units = "metric" // "metric", "imperial", "kelvin" by 
    let data;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=${units}&lang=en&appid=${owmapi}`;

    setTimeout(() => {
      if(!data){
        console.log("data is still empty: ");
        Movie.find({ 'author.username': user.username }, (err, movies) => {
          return res.render('users/profile', { user: user, movies: movies, data: data });
        });
      }
    }, 2000);
    
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(url);
        data = resp.data;
        Movie.find({ 'author.username': user.username }, (err, movies) => {
          res.render('users/profile', { user: user, movies: movies, data: data });
        });
      } catch (err) {  console.error(err); }
    };
    sendGetRequest();
  });
});

module.exports = router;