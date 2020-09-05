const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const middleware = require("../middleware");
let { checkMovieOwnership, checkCommentOwnership, isLoggedIn, isAdmin, isSafe } = middleware;

// List
router.get("/", (req, res) => {
  Movie.find({}, (err, movies) => {
    err ? console.log(err) : res.render("movies/index", { movies: movies });
  });
});

// Add
router.get("/new", isLoggedIn, (req, res) => {
  res.render("movies/new");
});

router.post("/", isLoggedIn, (req, res) => {
  req.body.movie.description = req.sanitize(req.body.movie.description);
  req.body.movie.author = {
    id: req.user._id,
    username: req.user.username
  };
  Movie.create(req.body.movie, (err) => {
    err ? console.log(err) : console.log('movie created...'); res.redirect("/movies");
  });
});

// Show
router.get("/:id", (req, res) => {
  Movie.findById(req.params.id).populate("comments").exec((err, movie) => {
    err ? console.log(err) : res.render("movies/show", { movie: movie });
  });
});

// Edit
router.get("/:id/edit", checkMovieOwnership, (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    err ? console.log(err) : res.render("movies/edit", { movie: movie });
  });
});

router.put("/:id", checkMovieOwnership, (req, res) => {
  req.body.movie.description = req.sanitize(req.body.movie.description);
  Movie.findByIdAndUpdate(req.params.id, req.body.movie, (err) => {
    err ? console.log(err) : console.log("movie updated..."); res.redirect("/movies/" + req.params.id);
  });
});

// Delete
router.delete("/:id", checkMovieOwnership, (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err) => {
    console.log("movie deleted...");
    res.redirect("/movies");
  });
});

module.exports = router;