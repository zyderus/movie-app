const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const middleware = require("../middleware");
const { checkMovieOwnership, checkCommentOwnership, isLoggedIn, isAdmin, isSafe } = middleware;

// List movies
router.get("/", (req, res) => {
  Movie.find({}, (err, movies) => {
    err ? console.log(err) : res.render("movies/movies", { locale: req.eval_language, movies: movies });
  });
});

// Add new movie
router.get("/new", isLoggedIn, (req, res) => {
  res.render("movies/new", { locale: req.eval_language });
});

router.post("/", isLoggedIn, (req, res) => {
  req.body.movie.description = req.sanitize(req.body.movie.description);
  req.body.movie.author = {
    id: req.user._id,
    username: req.user.username
  };
  Movie.create(req.body.movie, err => {
    err ? console.log(err) : 
      console.log("movie created..."); 
      res.redirect("/movies");
  });
});

// Show movie page
router.get("/:id", (req, res) => {
  Movie.findById(req.params.id).populate("comments").exec((err, movie) => {
    err ? console.log(err) : res.render("movies/show", { locale: req.eval_language, movie: movie });
  });
});

// Edit movie and update
router.get("/:id/edit", checkMovieOwnership, (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    err ? console.log(err) : res.render("movies/edit", { locale: req.eval_language, movie: movie });
  });
});

router.put("/:id", checkMovieOwnership, (req, res) => {
  req.body.movie.description = req.sanitize(req.body.movie.description);
  Movie.findByIdAndUpdate(req.params.id, req.body.movie, err => {
    err ? console.log(err) : 
      console.log("movie updated..."); 
      res.redirect("/movies/" + req.params.id);
  });
});

// Delete movie
router.delete("/:id", checkMovieOwnership, (req, res) => {
  Movie.findByIdAndRemove(req.params.id, err => {
    err ? console.log(err) : 
      console.log("movie deleted...");
      res.redirect("/movies");
  });
});

module.exports = router;