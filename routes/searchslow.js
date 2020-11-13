// const express = require("express");
// const router = express.Router();

// // Search
// router.get("/results", (req, res) => {
//   // search query from search input
//   let omdbapi = process.env.OMDBAPI;
//   let query = req.query.search;
//   let ids = [];
//   let movielist = [];

//   // add imdbIDs from initial search
//   const loopIds = async (movies) => {
//     for(movie of movies) {
//       ids.push(movie.imdbID);
//     }
//   }

//   // add movie's full information with imdbID
//   const populateMovies = async (movs) => {
//     for(mov of movs) {
//       const res = await axios.get(`http://www.omdbapi.com/?apikey=${omdbapi}&i=` + mov);
//       movielist.push(res.data);
//     }
//   }

//   const sendGetRequest = async () => {
//     try {
//         const resp = await axios.get(`http://www.omdbapi.com/?apikey=${omdbapi}&s=` + query);
//         const movies = resp.data.Search;
//         let idlist = await loopIds(movies);
//         let populate = await populateMovies(ids);
//         res.render('results', { movies: movielist });
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
//   };

//   sendGetRequest();

// });

// module.exports = router;