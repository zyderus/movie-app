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
  // Receive data
  try {
    const cacheInterval = 1000 * 60 * 60 * 24 * 10;
    const data = await fetchData(url, cacheInterval);
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

// Similar Movies (TMDb API)
router.get('/similar/:type/:showId', async (req, res) => {
  const type = req.params.type;
  const showId = req.params.showId;
  const language = req.query.language || null;
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url_path = `https://api.themoviedb.org/3/${type}/${showId}/similar?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// OpenWeatherMap
router.get('/weather', async (req, res) => {
  
  const lat = req.query.lat || null;
  const lon = req.query.lon || null;
  const lang = req.query.lang || null;
  const units = req.query.units || null;
  const params = new URLSearchParams({
    lat,
    lon,
    units,
    lang,
    appid: process.env.OWM_KEY,
  });
  const url_path = `https://api.openweathermap.org/data/2.5/weather?`;
  const url = url_path + params;

  // Receive data
  try {
    const data = await fetchData(url);
    data.locale = req.eval_language;
    return res.json(data);
  } catch (error) {
    return console.log(error);
  }
});

// Google Geocode proxy
router.get('/geocode', async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?`;
  const params = new URLSearchParams({
    latlng: req.query.latlng,
    key: process.env.GOOGLE_GEOCODE_KEY,
    language: req.query.language,
  });

  // Receive data
  try {
    const data = await fetchData(url + params);
    return res.json(data.results[0]);
  } catch (error) {
    return console.log(error);
  }
});

// Google Places proxy
router.get('/places', async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const params = new URLSearchParams({
    location: req.query.location,
    radius: req.query.radius,
    type: req.query.type,
    key: process.env.GOOGLE_GEOCODE_KEY,
    language: req.query.language,
  });

  // Receive data
  try {
    const data = await fetchData(url + params);
    return res.json(data.results);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;