console.log('connected 4_body.js');

const secTheaters = document.querySelector('.intheaters');
const secTheatersPick = document.querySelector('.intheaters-pick');
const secMovies = document.querySelector('.moviespopular');
const secMoviesPick = document.querySelector('.moviespopular-pick');
const secTv = document.querySelector('.tvpopular');

// Check if in Profiles page
if (window.location.pathname == '/') {
  document.addEventListener('DOMContentLoaded', initData());
}

// Collect initial TMDB data
async function initData() {
  await showGenres();
  showMoviesTrending();
  showInTheaters();
  showMoviesPopular();
}

// Collect genres list
async function showGenres() {
  movieGenres = await fetchData(url_movie_genres + url_params, 24 * 60 * 60 * 1000);
  document.querySelectorAll('.genres-list').forEach(list => {
    toGenresList(movieGenres.genres, list);
  });
}

// Display movies In theaters and a movie pick
async function showInTheaters() {
  const moviesIntheaters = await fetchData(url_theatersNow + url_params).then(data => data.results);
  const picked = await pickShow(moviesIntheaters);

  toSection(secTheaters, moviesIntheaters);
  toTheaterPicked(secTheatersPick, picked);
}

// Display Popular movies and a movie pick
async function showMoviesPopular() {
  const movies = await fetchData(url_moviesPopular + url_params).then(data => data.results);
  const picked = await pickShow(movies);
  const similars = await getSimilarShows(picked.id, 0);

  toSection(secMovies, movies);
  const similarsBox = toMoviePicked(secMoviesPick, picked);
  toSimilars(similarsBox, similars);
}

// Pick a show from array
function pickShow(shows) {
  const index = Math.floor(Math.random() * shows.length);
  const show = shows[index];
  return show;
}

// Fetch similar shows
async function getSimilarShows(id, type) {
  // type 0:movie or 1:tv
  type = type ? 'tv' : 'movie';
  const url = url_similars + `${type}/${id}?`;
  const similars = await fetchData(url + url_params).then(data => data.results.slice(0, 5));
  return similars;
}

// Display Trending movies
async function showMoviesTrending() {
  moviesTrending = await fetchData(url_moviesTrend + url_params);
  toCarousel(moviesTrending);
}

// Populate Carousel
function toCarousel(array) {
  gallery.innerHTML = '';
  galleryThumbnails.innerHTML = '';

  array.results.forEach((item, index) => {
    const { title, poster_path, vote_average, backdrop_path, overview, release_date, genre_ids, id } = item;

    const filmSlide = document.createElement('div');
    filmSlide.classList.add('carousel-item');
    index === 0 ? (filmSlide.className += ' active') : '';
    filmSlide.style.backgroundImage = `url("${img_path_highres + backdrop_path}")`;

    // Slides output
    filmSlide.innerHTML = `
      <div class="fade-overlay"></div>
      <div class="carousel-caption d-md-block">
      <!-- <div class="carousel-caption d-none d-md-block"> -->
        <h2 class="display-4">${title}</h2>
          <p class="lead overview-header__stats">
            <span class="carousel-caption-overview">${new Date(release_date).getFullYear()}</span> 
            <span class="pipe carousel-caption-overview">|</span> 
            <span class="carousel-caption-overview">
              <i class="${vote_average == 0 ? '' : getClassByRate(vote_average).star}"></i> ${
      vote_average == 0 ? '' : vote_average
    } </span>
            <span class="pipe carousel-caption-overview">|</span> 
            <span class="carousel-caption-overview">${showMovieListGenres(genre_ids)}</span>
          </p>
        <div class="film-details">
          <a class="button-container-${index}" href="#"></a>
          <p class="lead">${overview.substring(0, 200)}...</p>
        </div>
      </div>
      `;

    gallery.appendChild(filmSlide);

    // Create a button and attach click event listener
    const button = document.createElement('button');
    button.classList.add('btn-custom');
    button.className += ' mb-3';
    button.innerHTML = '<i class="fas fa-play"></i> Play';
    button.addEventListener('click', function () {
      fetchMovie(id);
    });
    // On each forEach iteration attach the button to an element with
    // a unique id
    document.querySelector('.button-container-' + index).appendChild(button);

    // Icons output
    const filmElement = document.createElement('li');
    // index === 0 ? filmElement.className += " active" : '';
    filmElement.setAttribute('data-target', '#carousel-main');
    filmElement.setAttribute('data-slide-to', `${index}`);
    filmElement.innerHTML = `
      <div class="card-dummy">
        <img src="${img_path + poster_path}">
      </div>
    `;
    marqueeReel.appendChild(filmElement);
  });

  // Fill marquee space between last and first card
  infiniteMarquee();
}

// Populate a section
function toSection(section, movies) {
  section.innerHTML = '';
  if (movies.length < 1) {
    // Inform user if no results
    section.innerHTML = `<div class="section-title">No Results Found<span class="section-backlogo">No Results Found</span></div>`;
    return false;
  }

  // Show movie-cards size toggle icons
  section.innerHTML = `
  <div class="section-row">
    <div class="section-title">${section.getAttribute(
      'data-desc'
    )}<span class="section-backlogo">${section.getAttribute('data-desc')}</span></div>
    <div class="view-icons-container">
      <span class="view-icons btn-view-sm">
        <svg class="btn-view-sm" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-grid-3x2-gap" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path class="btn-view-sm" fill-rule="evenodd" d="M4 4H2v2h2V4zm1 7V9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 5V9a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 4H7v2h2V4zm5 0h-2v2h2V4zM4 9H2v2h2V9zm5 0H7v2h2V9zm5 0h-2v2h2V9zm-3-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2z"/>
        </svg>
      </span>
      <span class="view-icons btn-view-lg">
        <svg class="btn-view-lg" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-grid" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path class="btn-view-lg" fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
        </svg>
      </span>
    </div>
  </div>
  `;

  movies.forEach((movie, index) => {
    const { title, poster_path, vote_average, backdrop_path, overview, release_date, genre_ids, id } = movie;

    const movieElement = document.createElement('div');
    movieElement.className = 'movie';

    movieElement.innerHTML = `      
      <div class="img-container">
        <div class="img" style="background-image: url('${img_path + poster_path}');"></div>
        <div class="overlay"></div>
      </div>
      <div class="movie-info">
        <div class="overview">
          <div class="overview-header">
            ${title}<br>
            <div class="overview-header__stats">
              <span>${new Date(release_date).getFullYear()}</span> 
              <span class="pipe">|</span> 
              <span class="${getClassByRate(vote_average).class}">
                ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
              </span><br>
              <span class="genres">${showMovieListGenres(genre_ids)}</span>
            </div>
          </div>
          
          <div class="overview-body">
           <!-- <p>${overview}</p> -->
          </div>
          <div class="overview-footer">
          </div>          
        </div>
      </div>
    `;

    // On each forEach iteration attach a button to an element with a watch movie link
    section.appendChild(movieElement);
    movieElement.addEventListener('click', function () {
      fetchMovie(id);
    });
  });
}

// Pick a show from array
function toTheaterPicked(section, movie) {
  section.innerHTML = '';
  if (movie.length) {
    section.innerHTML = `<div class="section-title">No Results Found<span class="section-backlogo">No Results Found</span></div>`;
    return false;
  }

  const { title, poster_path, vote_average, backdrop_path, overview, release_date, genre_ids, id } = movie;
  const movieElement = document.createElement('div');
  movieElement.className = 'pickedMovie';
  movieElement.style.backgroundImage = `url(${img_path_highres + backdrop_path})`;
  movieElement.innerHTML = `
    <div class="picked-overlay"></div>
    <div class="info-row">
      <div class="info-box">
        <div class="picked-title">${title} <span>(${new Date(release_date).getFullYear()})</span></div>
        <span class="picked-rating">
          ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
        </span><br>
        <span class="genres">${showMovieListGenres(genre_ids)}</span>
      </div>
      <div class="map-box">
        ${section.getAttribute('data-desc')}<br>
        <div id="map">MAP</div>
      </div>
    </div>
  `;

  section.appendChild(movieElement);
  const infoBox = movieElement.querySelector('.info-box');
  infoBox.addEventListener('click', () => fetchMovie(id));
  // Show map if coordinates available, if not, try again
  const showMap = () => {
    if (!coordinates) {
      setTimeout(() => {
        showMap();
      }, 200);
    } else {
      initMap(coordinates);
    }
  };
  showMap();
}

// Display picked popular movie and similars
function toMoviePicked(section, movie) {
  section.innerHTML = '';
  if (movie.length) {
    // Inform user if no movie found
    section.innerHTML = `<div class="section-title">No Results Found<span class="section-backlogo">No Results Found</span></div>`;
    return;
  }

  const { title, poster_path, vote_average, backdrop_path, overview, release_date, genre_ids, id } = movie;
  const movieElement = document.createElement('div');
  movieElement.className = 'picked-movie-similars';
  movieElement.style.backgroundImage = `url(${img_path_highres + backdrop_path})`;
  movieElement.innerHTML = `
    <div class="picked-overlay"></div>
    <div class="info-box">
      ${section.getAttribute('data-desc')}<br>
      <div class="picked-title">${title} <span>(${new Date(release_date).getFullYear()})</span></div>
      <span class="picked-rating">
        ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
      </span><br>
      <span class="genres">${showMovieListGenres(genre_ids)}</span>
    </div>
    <div class="similars-box">
    </div>
    </div>
  `;

  section.appendChild(movieElement);
  const infoBox = movieElement.querySelector('.info-box');
  infoBox.addEventListener('click', () => fetchMovie(id));
  const similarsBox = movieElement.querySelector('.similars-box');
  return similarsBox;
}

// Fill Similars section
function toSimilars(section, movies) {
  section.innerHTML = '';
  movies.forEach((movie, index) => {
    const { title, poster_path, vote_average, backdrop_path, overview, release_date, genre_ids, id } = movie;
    const movieElement = document.createElement('div');
    movieElement.className = 'similars-card';
    movieElement.innerHTML = `
      <div class="similars-bg" style="background-image: url(${img_path + backdrop_path})"></div>
      <div class="movie-info">
        <div class="overview">
          <div class="overview-header">
            ${title}<br>
            <div class="overview-header__stats">
              <span>${new Date(release_date).getFullYear()}</span> 
              <span class="pipe">|</span> 
              <span>
                ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
              </span><br>
              <span class="genres">${showMovieListGenres(genre_ids)}</span>
            </div>
          </div>          
        </div>
      </div>
    `;

    // On each forEach iteration attach the button to an element with
    section.appendChild(movieElement);
    movieElement.addEventListener('click', function () {
      fetchMovie(id);
    });
  });
}

// Populate Movie details
function watchMovie(movie) {
  const { title, poster_path, vote_average, backdrop_path, overview, release_date, genres } = movie;

  clearPage();
  header.innerHTML = `
    <!-- <div class="section-title">Title<span class="section-backlogo">Title</span></div> -->
    <!-- <h1>Title</h1> -->

    <section class="watch-movie">
      <div class="watch-movie-bg-decor">${title}</div>
      <div class="watch-movie-bg"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-sm-12 padding-0">
            <div class="movie-glance">
              <div class="film-page_poster">
                <img class="img-fluid" src="${img_path + poster_path}" alt="${title}" title="${title}"> 
              </div>
              <div class="movie-info-container">
                <div class="">
                  <div class="film-page_title">${title}</div>
                  <div class="film-page_title-stats">
                    <span>${new Date(release_date).getFullYear()}</span>
                    <span>|</span>
                    <span> R </span>
                    <span>|</span>
                    <span> 2hr 20min</span>
                  </div>
                </div>
                <div class="film-page_rating">
                  <span class="rating-star"><i class="${getClassByRate(vote_average).star}"></i></span>
                  <span class="rating-score ${getClassByRate(vote_average).class}">${vote_average}</span>
                  <span class="reviews">87 875 <i class="fas fa-user-alt"></i></span>
                </div>
                <div class="film-page_genre">
                  <span>${showMovieGenres(genres)}</span>
                </div>
              </div>
            </div>
            <div class="movie-sources">
              <ul class="play-button-group">
                <li><a href="#" class="btn btn-sm btn-secondary wm-btn">4K <i class="fas fa-play"></i></a></li>
                <li><a href="#" class="btn btn-sm btn-secondary wm-btn">HD <i class="fas fa-play"></i></a></li>
                <li><a href="#" class="btn btn-sm btn-secondary wm-btn">SD <i class="fas fa-play"></i></a></li>
                <li><a href="#" class="btn btn-sm btn-secondary wm-btn">IN THEATERS <i class="fas fa-film"></i></a></li>
              </ul>
            </div>
          </div> 
          <div class="col-lg-6 col-sm-12">
            <div class="movie-description">
              <p>${overview}</p>
            </div>  
          </div> 
        </div>
        <div class="row">
        <!-- 
          <div class="iframe-container">
            <iframe src="https://www.youtube.com/embed/ngWBddVNVZs?autoplay=1&start=13&mute=1" 
            allow="autoplay; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
          </div>
        -->
        </div>
      </div>
    </section>

    <section class="suggest-movie">
      <div class="container">
        <div class="title">
          <h4>You Also May Like</h4>
        </div>
      </div>
    </section>

    <div class="container" style="padding-bottom: 10rem;">
      <button data-tooltip=" Tooltip">Submit Form</button>
    </div>
  `;
  window.scrollTo(0, 0);
}

// Populate Genre lists
function toGenresList(genres, list) {
  list.innerHTML = '';

  genres.forEach((genre, index) => {
    const { name } = genre;

    const genreElement = document.createElement('li');
    genreElement.classList.add('genre-li');

    genreElement.innerHTML = `<a href="">${name}</a>`;

    // On each forEach iteration attach the button to an element with
    list.appendChild(genreElement);
    genreElement.addEventListener('click', function () {
      // fetchMoviebyGenre(id);
    });
  });
}

// Click on view-icons for cards size
document.addEventListener('click', e => {
  if (e.target.classList == 'btn-view-sm') {
    document.querySelector('.btn-view-sm').style.opacity = 1;
    document.querySelector('.btn-view-lg').style.opacity = 0.6;
    document.querySelectorAll('.movie').forEach(movie => {
      movie.className = 'movie-small';
    });
  }
  if (e.target.classList == 'btn-view-lg') {
    document.querySelector('.btn-view-sm').style.opacity = 0.6;
    document.querySelector('.btn-view-lg').style.opacity = 1;
    document.querySelectorAll('.movie-small').forEach(movie => {
      movie.className = 'movie';
    });
  }
});

// // event added to target if = #burger
// document.addEventListener('click', function(e){
//   if(e.target && e.target.id == 'burger'){
//     console.log('listener attached to document');
//    }
// });

// burger menu listener assigned to parent
// document.querySelector("#burger").click();

//   // Show movie card in Megamenu
//   const randMovie = Math.floor(Math.random() * 20);
//   showMegamenuMovie(respData.results[randMovie]);

// Loop search inputs for value
// searchForms.forEach((form) => {
//   form.addEventListener('submit', (e) => {
//     let searchValue = form.querySelector('.search-input').value;
//     e.preventDefault();

//     if (searchValue) {
//       main.innerHTML = '';
//       document.querySelector('header').innerHTML = '';
//       document.querySelector('#search-container-nav').style.visibility = 'unset';
//       getMovies(search_url + searchValue);
//       form.querySelector('.search-input').value = '';
//     }
//   });
// });

// function onhover() {
//   console.log('hi');
//   document.querySelector('.movie-info').className = 'movie-info-active';
// }

// function clickWatch(index) {
//   document.addEventListener('click', function(e) {
//     if(e.target && e.target.id == 'movie-link') {
//       console.log('clicked from closure ', index);
//     }
//   });
// }
