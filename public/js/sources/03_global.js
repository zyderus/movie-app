console.log('connected 1_global.js');

// TMDb API parameters
const url_params = new URLSearchParams({ language });
const img_path = 'https://image.tmdb.org/t/p/w300';
const img_path_highres = 'https://image.tmdb.org/t/p/w1280';

// TMDB data proxies
const url_movie_genres = '/api/movies/genres?';
const url_search = '/api/movies/search?query=';
const url_theatersNow = '/api/theaters/nowplaying?';
const url_theatersUpcoming = '/api/theaters/upcoming?';
const url_moviesTrend = '/api/movies/trending?';
const url_moviesPopular = '/api/movies/popular?';
const url_movieInfo = '/api/movies/movieinfo/';
const url_similars = '/api/similar/';

const marqueeReel = document.querySelector('.marquee-content');
const gallery = document.querySelector('.carousel-inner');
const galleryThumbnails = document.querySelector('.carousel-indicators');
const searchResults = document.querySelectorAll('search-results');
const sections = document.querySelectorAll('section');
const header = document.querySelector('header');

// Search form
const searchContainerMain = document.querySelector('#search-container-main');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const elem = document.querySelector('elem');    // collection of translations from backend via data-... property

let movieGenres;

// Clean up Local Storage of old data on second reload of same session
// add flag if there is current session ip data
// if there is flag clean up local storage of data older than 1 month

/* OPEN DROPDOWNS ON HOVER */
// // Vars
// const dropdowns = document.querySelectorAll('nav .dropdown');
// const dropdownMenus = document.querySelectorAll('nav .dropdown-menu');

// // Open dropdown menu on hover
// dropdowns.forEach(dropdown => {
//   const dropdownMenu = dropdown.querySelector('.dropdown-menu');
//   dropdown.addEventListener('mouseover', () => {
//     removeClass(dropdownMenus);
//     if(window.getComputedStyle(dropdownMenu).visibility === "visible") {
//       dropdownMenu.classList.add("show");
//     // }
//   });
// });
