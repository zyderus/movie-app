console.log('connected 3_data_prep.js');

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

let movieGenres;

// Search movies (no caching)
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchValue = searchInput.value;
  const url = url_search + searchValue + '&' + url_params;

  if (searchValue) {
    clearPage();

    const data = await fetchData(url).then(res => res.results);
    toSection(sections[0], data);
    searchInput.value = '';
  }
});

// Loop genres for Movie list
const showMovieListGenres = genres => {
  const genresArr = movieGenres;
  const list = movieGenres.genres;
  let genresarr = [];
  genres.map(genre => {
    list.map(item => {
      if (genre == item.id) {
        genresarr.push(item.name);
      }
    });
  });
  return genresarr.join(', ');
};

// Loop genres for a movie
const showMovieGenres = genres => {
  const list = genres;
  let genresarr = [];
  list.map(item => {
    genresarr.push(item.name);
  });
  return genresarr.join(', ');
};
