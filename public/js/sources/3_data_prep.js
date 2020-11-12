console.log('connected 3_data_prep.js');

// TMDB api caching fetch interval
const cacheInterval = 20 * 1000;   // 15s
// TMDb API url parameters
const url_params = new URLSearchParams({ language });

// TMDB images paths
const img_path = 'https://image.tmdb.org/t/p/w300';
const img_path_highres = 'https://image.tmdb.org/t/p/w1280';

// TMDB data proxies
const url_movie_genres = `/api/movies/genres?`;
const url_search = `/api/movies/search?query=`;
const url_theatersNow = `/api/theaters/nowplaying?`;
const url_theatersUpcoming = `/api/theaters/upcoming?`;
const url_moviesTrend = `/api/movies/trending?`;
const url_moviesPopular = `/api/movies/popular?`;
const url_movieInfo = `/api/movies/movieinfo/`;
const url_weatherInfo = `/api/weather?`;

const marqueeReel = document.querySelector('.marquee-content');
const gallery = document.querySelector('.carousel-inner');
const galleryThumbnails = document.querySelector('.carousel-indicators');
const main = document.querySelector('main');
const section = document.querySelector('section');
const header = document.querySelector('header');
const weather = document.querySelector('.weather-data');
const clientInfo = document.querySelector('.client-data');

let movieGenres;

// Search movies (w/o caching)
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  const url = url_search + searchValue + "&" + url_params;
  
  if (searchValue) {
    header.innerHTML = '';
    main.innerHTML = '';
    document.querySelector('header').innerHTML = '';

    const data = await fetchData(url);
    toMain(data);
    searchInput.value = '';
  }
});

// Read and Write data to local storage
const writeToCache = (url, data) => localStorage.setItem(url, JSON.stringify(data));
const readFromCache = url => JSON.parse(localStorage.getItem(url)) || null;

// Fetch fresh data
async function getFreshData(url) {
  const response = await fetch(url);
  let data = await response.json();
  data.time = Date.now();
  return data;
};

// Fetch data and cache by default
const fetchData = async (url, interval = cacheInterval, cache = true) => {
  const cacheData = readFromCache(url);
  if(cacheData && cacheData.time > Date.now() - interval) {
    return cacheData;
  } else {
    const data = await getFreshData(url);
    if(cache) {
      writeToCache(url, data);
    }
    return data;
  }
};

// Fetch movie details by Id
async function fetchMovie(movieId) {
  const url = `${url_movieInfo + movieId}?${url_params}`;
  const data = await fetchData(url);
  watchMovie(data);
}

// Loop genres for Movie list
const showMovieListGenres = genres => {
  const genresArr = movieGenres;
  const list = movieGenres.genres;
  let genresarr = [];
  genres.map(genre => {
    list.map(item => {
      if(genre == item.id) {
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

// Evaluate movie rating scores
function getClassByRate(rate) {
  if (rate == 0) {
    return {
      class: "hide",
    }
  } else if (rate >= 7) {
    return {
      class: "green",
      star: "fas fa-star"
    }
  } else if (rate > 5) {
    return {
      class: "orange",
      star: "fas fa-star-half"
    }
  } else {
    return {
      class: "red",
      star: "far fa-star"
    }
  }
}