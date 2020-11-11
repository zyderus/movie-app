const express = require("express");
const router = express.Router();
const { fetchData } = require("../functions/movieapi");

// Search movies (TMDb API)
router.get('/movies/search', async (req, res) => {

  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    query: req.query.query,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/search/movie?`;
  const url = url_path + params;
  
  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Movie Details (TMDb)
router.get('/movies/movieinfo/:id', async (req, res) => {

  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/movie/${req.params.id}?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Movie Genres (TMDb)
router.get('/movies/genres', async (req, res) => {

  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/genre/movie/list?`;
  const url = url_path + params;

  console.log(url)

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Movies Trending (TMDb API)
router.get('/movies/trending', async (req, res) => {

  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/trending/movie/day?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Movies Popular (TMDb API)
router.get('/movies/popular', async (req, res) => {

  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/movie/popular?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Theaters Now Playing (TMDb API)
router.get('/theaters/nowplaying', async (req, res) => {
  
  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/movie/now_playing?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Theaters Upcoming Movies (TMDb API)
router.get('/theaters/upcoming', async (req, res) => {
  
  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/movie/upcoming?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;