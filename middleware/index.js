const Movie     = require("../models/movie");
const Comment   = require("../models/comment");

module.exports  = {

  // User movie authorization
  checkMovieOwnership: (req, res, next) => {
    if(req.isAuthenticated()) {
      Movie.findById(req.params.id, (err, movie) => {
        if(err) {
          console.log(err);
          res.redirect("back");
        } else {
          if(movie.author.id.equals(req.user._id)) {
            next();
          } else {
            console.log("YOU ARE NOT AUTHORIZED TO MAKE THESE CHANGES...");
            res.redirect("back");
          }
        }
      });
    } else {
      console.log("PLEASE LOGIN...");
      res.redirect("back");
    }
  },

  // User comment authorization
  checkCommentOwnership: (req, res, next) => {
    if(req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, comment) => {
        if(err) {
          console.log(err);
          res.redirect("back");
        } else {
          if(comment.author.id.equals(req.user._id)) {
            next();
          } else {
            console.log("YOU ARE NOT AUTHORIZED TO MAKE THESE CHANGES...");
            res.redirect("back");
          }
        }
      });
    } else {
      console.log("PLEASE LOGIN");
      res.redirect("back");
    }
  },

  // User authentication
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },

  // Admin authentication
  isAdmin: (req, res, next) => {
    if(req.user.isAdmin) {
      console.log("YOU ARE ADMIN");
      next();
    } else {
      console.log("YOU ARE NOT ADMIN", err);
      res.redirect("back");
    }
  },

  // Accept unsplash.com image links
  isSafe: (req, res, next) => {
    if (req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
      next();
    } else {
      console.log("ONLY IMAGES FROM IMAGES.UNSPLASH.COM ALLOWED");
      res.redirect("back");
    }
  }
  
}