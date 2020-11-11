console.log('connected 3_genres.js');

// TMDB api caching fetch interval
const interval = 15 * 1000;   // 15s

// TMDb API url parameters
const url_params = new URLSearchParams({
  language,
});

const img_path = 'https://image.tmdb.org/t/p/w300';
const img_path_highres = 'https://image.tmdb.org/t/p/w1280';

const url_movie_genres = `/api/movies/genres?`;
const search_url = `/api/movies/search?query=`;
const url_theatersNow = `/api/theaters/nowplaying?`;
const url_theatersUpcoming = `/api/theaters/upcoming?`;
const url_moviesTrend = `/api/movies/trending?`;
const url_moviesPopular = `/api/movies/popular?`;
const url_movieInfo = `/api/movies/movieinfo/`

const marqueeReel = document.querySelector('.marquee-content');
const gallery = document.querySelector('.carousel-inner');
const galleryThumbnails = document.querySelector('.carousel-indicators');
const main = document.querySelector('main');
const section = document.querySelector('section');
const header = document.querySelector('header');


// Read and Write data to local storage cache
const writeToCache = (url, data) => localStorage.setItem(url, JSON.stringify(data));
const readFromCache = url => JSON.parse(localStorage.getItem(url)) || null;

// Fetch fresh data from API and cache
const getFreshData = async (url) => {
  const response = await fetch(url);
  let data = await response.json();
  data.time = Date.now();

  return data;
};

// Fetch data with cache by default
const fetchData = async (url, output, cache = true) => {
  if(readFromCache(url) && readFromCache(url).time > Date.now() - interval) {

    console.log('cached Data with time: ', readFromCache(url).time);
    output(readFromCache(url));
  } else {
    const data = await getFreshData(url);

    if(cache) {
      writeToCache(url, data);
      console.log('fetch cached.........');
    }

    console.log('fresh data from API with time: ', data.time);
    output(data);
  }
};

// Get Movie Genres
async function fetchGenres(url, cache = true) {
  if(readFromCache(url) && readFromCache(url).time > Date.now() - interval) {
    return readFromCache(url);
  } else {
    const data = await getFreshData(url);
    if(cache) {
      writeToCache(url, data);
    }
    return data;
  }
}


// Movies genres list
let sup_genres;       // Dynamic
let genre_data = {    // Static
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}


// Loop genres for Movie Lists
const getGenres = (genres) => {
    const list = sup_genres;
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

// Loop genres for Movie Details page
const getMovieGenres = (genres) => {
  const list = genres;
  let genresarr = [];
    list.map(item => {
      genresarr.push(item.name);
    });
  return genresarr.join(', ');
};