// const express = require("express");
// const router = express.Router();

// // SEARCH
// // Search results
// router.get("/results", (req, res) => {
//   // search query from search input
//   let omdbapi = process.env.OMDBAPI;
//   let query = req.query.search;
//   let url = `http://www.omdbapi.com/?apikey=${omdbapi}&s=` + query;

//   const sendGetRequest = async () => {
//     try {
//         const resp = await axios.get(url);
//         // clean incoming json
//         const movies = resp.data.Search;
//         res.render('movies/results', { movies: movies });
//     } catch (err) {
//         console.error(err);
//     }
//   };
//   sendGetRequest();
// });

// // Show result
// router.get("/results/:imdbID", (req, res) => {
//   let url = "http://www.omdbapi.com/?apikey=thewdb&plot=full&i=" + req.params.imdbID;

//   const sendGetRequest = async () => {
//     try {
//         const resp = await axios.get(url);
//         // clean incoming json
//         const movie = resp.data;
//         res.render('movies/details', { movie: movie });
//     } catch (err) {
//         console.error(err);
//     }
//   };
//   sendGetRequest();
// });

// module.exports = router;