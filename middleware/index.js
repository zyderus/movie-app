const Movie    = require("../models/movie");
const Comment = require("../models/comment");
module.exports = {

  checkMovieOwnership:(req, res, next) => {
    if(req.isAuthenticated()) {
      Movie.findById(req.params.id, (err, movie) => {
        if(err) {
          console.log(err);
          res.redirect("back");
        } else {
          if(movie.author.id.equals(req.user._id)) {
            next();
          } else {
            console.log("YOU DO NOT HAVE AUTHORIZATION TO DO THAT");
            res.redirect("back");
          }
        }
      });
    } else {
      console.log("PLEASE LOGIN");
      res.redirect("back");
    }
  },

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
            console.log("YOU DO NOT HAVE AUTHORIZATION TO DO THAT");
            res.redirect("back");
          }
        }
      });
    } else {
      console.log("PLEASE LOGIN");
      res.redirect("back");
    }
  },

  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },

  isAdmin: (req, res, next) => {
    if(req.user.isAdmin) {
      console.log("YOU ARE ADMIN");
      next();
    } else {
      console.log("YOU ARE NOT ADMIN", err);
      res.redirect("back");
    }
  },

  isSafe: (req, res, next) => {
    if (req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
      next();
    } else {
      console.log("ONLY IMAGES FROM IMAGES.UNSPLASH.COM ALLOWED");
      res.redirect("back");
    }
  }
  
}