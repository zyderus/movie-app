const express = require("express");
const router = express.Router({ mergeParams: true });
const Movie = require("../models/movie");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const { checkMovieOwnership, checkCommentOwnership, isLoggedIn, isAdmin, isSafe } = middleware;

// Add new comment
router.get("/new", isLoggedIn, (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    err ? console.log(err) : res.render("comments/new", { locale: req.eval_language, movie: movie });
  });
});

router.post("/", isLoggedIn, (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    req.body.comment.author = {
      id: req.user._id,
      username: req.user.username
    };
    Comment.create(req.body.comment, (err, comment) => {
      console.log('comment added created');
      movie.comments.push(comment);
      movie.save();
      console.log('comment id added to movie');
      res.redirect('/movies/' + movie._id);
    });
  });
});

// Edit comments and update
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    err ? console.log(err) : 
      res.render("comments/edit", { locale: req.eval_language, movie_id: req.params.id, comment: comment });
  });
});

router.put("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    err ? console.log(err) : 
      console.log("comment updated..."); 
      res.redirect("/movies/" + req.params.id);
  });
});

// Delete comment
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    err ? console.log(err) : 
      console.log("comment deleted..."); 
      res.redirect("/movies/" + req.params.id);
  });
});

module.exports = router;