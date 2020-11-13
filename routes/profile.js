const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Movie = require('../models/movie');
const passport = require("passport");
const parser = require('ua-parser-js');
const { isLoggedIn } = require('../middleware');

// Profile
router.get("/profile/:user_id", async (req, res) => {
  const horde = getClientInfo(req);
  
  const user = await User.findById(req.params.user_id);
  const movies = await Movie.find({ 'author.username': user.username });

  res.render('users/profile', { locale: req.eval_language, user, horde, movies });
});

module.exports = router;


// Parse client request data
function getClientInfo(req) {
  let data = parser(req.headers['user-agent']);
  data.timestamp = Date.now();
  // add IP and Proxy
  if (req.headers['via']) { // yes
    data.ip = req.headers['x-forwarded-for'] || null;
    data.proxy = req.headers['via'] || null;
  } else { // no
    data.ip = req.connection.remoteAddress || null;
    data.proxy = "none";
  }
  return data;
}