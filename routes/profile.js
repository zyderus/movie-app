const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const axios = require("axios");

// Profile
router.get("/profile/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    let apiKey = "73ccfb39651ee95f5ba9a7a7ae60941a";
    let latitude = 39.749407;
    let longtitude = 64.420079;
    let units = "metric" // "metric", "imperial", "kelvin" by 
    let data;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=${units}&lang=en&appid=${apiKey}`;
    // let url = "https://api.openweathermap.org/data/2.5/weather?lat=39.749407&lon=64.420079&units=metric&lang=ru&appid=73ccfb39651ee95f5ba9a7a7ae60941a";
    // let url = "https://api.openweathermap.org/data/2.5/onecall?lat=39.749407&lon=64.420079&exclude={part}&appid=73ccfb39651ee95f5ba9a7a7ae60941a";

    setTimeout(() => {
      if(!data){
        console.log("data is still empty: ");
        return res.render('profile', { user: user, data: data });
      }
    }, 2000);
    
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get(url);
        data = resp.data;
        res.render('profile', { user: user, data: data });
      } catch (err) {  console.error(err); }
    };
    sendGetRequest();
  });
});

module.exports = router;