console.log('connected 4_body.js');

// Initialize sequence
initData();

// Collect initial TMDB data
async function initData() {
  await showGenres();
  showMoviesTrending();
  showMoviesPopular();
  const ipdata = await sessionIpData();
  showWeather(ipdata);
  showClientside(ipdata);
}

// Collect genres list
async function showGenres() {
  movieGenres = await fetchData(url_movie_genres + url_params, 24 * 60 * 60 * 1000);
  document.querySelectorAll('.genres-list').forEach(list => {
    toGenresList(movieGenres.genres, list);
  });
}

// Display Popular movies
async function showMoviesPopular() {
  if(main) {
    moviesPopular = await fetchData(url_moviesPopular + url_params);
    toMain(moviesPopular);
  }
}

// Display Trending movies
async function showMoviesTrending() {
  if(gallery) {
    moviesTrending = await fetchData(url_moviesTrend + url_params);
    toCarousel(moviesTrending);
  }
}

// Display Weather info
async function showWeather(data) {
  if(weather) {
    const params = new URLSearchParams({ 
      lat: data.latitude,
      lon: data.longitude,
      units: "metric",    // "metric", "imperial", "kelvin"
      lang: language,
    });    
    const resdata = await fetchData(url_weatherInfo + params);
    toWeather(resdata);
    
    console.log('received weather data: ', resdata);
  }
}
















// Display Clientside info
async function showClientside(data) {
  if(clientInfo) {
    let browser_geolocation = false;
    
    if(true) {

    } else {

    }

    toClientInfo(data);
      
      // console.log('received weather data: ', "resdata");
  }
}















// Populate Carousel
function toCarousel(array) {
  gallery.innerHTML = '';
  galleryThumbnails.innerHTML = '';

  array.results.forEach((item, index) => {
    const { title,
            poster_path,
            vote_average,
            backdrop_path,
            overview,
            release_date,
            genre_ids,
            id
          } = item;

    const filmSlide = document.createElement('div');
    filmSlide.classList.add('carousel-item');
    index === 0 ? filmSlide.className += " active" : '';
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
              <i class="${vote_average == 0 ? "" : getClassByRate(vote_average).star}"></i> ${vote_average == 0 ? "" : vote_average} </span>
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
      const button = document.createElement("button");
      button.classList.add('btn-custom');
      button.className += ' mb-3'
      button.innerHTML = '<i class="fas fa-play"></i> Play';
      button.addEventListener('click', function() {
        fetchMovie(id);
      });
      // On each forEach iteration attach the button to an element with 
      // a unique id
      document.querySelector(".button-container-" + index).appendChild(button);

    // Icons output
    const filmElement = document.createElement('li');
    // index === 0 ? filmElement.className += " active" : '';
    filmElement.setAttribute("data-target", "#carousel-main");
    filmElement.setAttribute("data-slide-to", `${index}`);
    filmElement.innerHTML = `
      <div class="card-dummy">
        <img src="${img_path + poster_path}">
      </div>
    `
    marqueeReel.appendChild(filmElement);
  });

  // Fill marquee space between last and first card 
  infiniteMarquee();
}

// Populate Main div
function toMain(movies) {
  if(movies.length < 1) {
    main.innerHTML = '';
    main.innerHTML = `<div class="section-title">No Results Found<span class="section-backlogo">No Results Found</span></div>`;
    return false;
  }

  main.innerHTML = '';
  main.innerHTML = `<div class="section-title">POPULAR NOW<span class="section-backlogo">POPULAR</span></div>`

  movies.results.forEach((movie, index) => {
    const { title, 
            poster_path,
            vote_average, 
            backdrop_path,
            overview,
            release_date,
            genre_ids,
            id
          } = movie;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
      <div id="burger" class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      
      <div class="img-container">
        <div class="img" style="background-image: url('${img_path + poster_path}');"></div>
        <div class="overlay"></div>
      </div>
      <div class="movie-info">
        <div class="overview">
          <div class="overview-header">
            <h3>${title}</h3>
            <div class="overview-header__stats">
              <span>${new Date(release_date).getFullYear()}</span> 
              <span class="pipe">|</span> 
              <span class="${getClassByRate(vote_average).class}">
                ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
              <span class="pipe">|</span> 
              <span>${showMovieListGenres(genre_ids)}</span>
            </div>
          </div>
          
          <div class="overview-body">
            <p>${overview}</p>
          </div>
          <div class="overview-footer">
          </div>          
        </div>
      </div>
    `

    // On each forEach iteration attach the button to an element with 
    main.appendChild(movieElement);
    movieElement.addEventListener('click', function() {
      fetchMovie(id);
    });
  });
}

// Populate Movie details
function watchMovie(movie) {
  const { 
    title, 
    poster_path,
    vote_average, 
    backdrop_path,
    overview,
    release_date,
    genres
  } = movie;

  header.innerHTML = '';
  main.innerHTML = '';
  section.innerHTML = `
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
          <div class="iframe-container">
            <iframe src="https://www.youtube.com/embed/ngWBddVNVZs?autoplay=1&start=13&mute=1" 
            allow="autoplay; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
          </div>
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
  `
}

// Populate Genre lists
function toGenresList(genres, list) {
  list.innerHTML = '';

  genres.forEach((genre, index) => {
    const { name } = genre;

    const genreElement = document.createElement('li');
    genreElement.classList.add('genre-list');

    genreElement.innerHTML = `<a href="">${name}</a>`;

    // On each forEach iteration attach the button to an element with 
    list.appendChild(genreElement);
    genreElement.addEventListener('click', function() {
      // fetchMoviebyGenre(id);
    });
  });
}

function toWeather(data) {
  if(data.length < 1) {
    weather.innerHTML = '';
    weather.innerHTML = `<div>No Weather Data</div>`;
    return;
  }
  weather.innerHTML = '';
  weather.innerHTML = `<div><strong>Weather Info:</strong></div>`

  const city = data.name;
  const temp = data.main.temp;
  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;

  const weatherElement = document.createElement('div');
  weatherElement.classList.add('weather');
  weatherElement.innerHTML = `
    ${'lang.city'}: ${city}<br>
    ${'lang.temp'}: ${temp} &deg;C <br>
    <img class="weather-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"> <br>
    ${desc}
  `;

  // On each forEach iteration attach the button to an element with 
  weather.appendChild(weatherElement);
  weatherElement.addEventListener('click', function() {
    // fetchMovie(id);
  });
}

// Display ClienInfo
function toClientInfo(data) {
  if(data.length < 1) {
    clientInfo.innerHTML = '';
    clientInfo.innerHTML = `<div>No Client Data</div>`;
    return;
  }
  clientInfo.innerHTML = '';
  clientInfo.innerHTML = `<div><strong>Clientside Collected Info:</strong></div>`

  // const ip = data.ip;
  // const proxy = data.proxy;
  // const latitude = data.lat;
  // const longitude = data.lon;
  // const city = data.city;
  // const country = data.country;
  // const timezone = data.timezone;
  // const os = data.os;
  // const osarchitecture = data.osarch;
  // const os_ver = data.osversion;
  // const browser = data.browser;
  // const browser_ver = data.browser_ver;
  // const sessionsip = data.sessionsip;


  const clientInfoElement = document.createElement('div');
  clientInfoElement.classList.add('client-info');
  clientInfoElement.innerHTML = `
    ${'lang.ipaddress'}: ${'ipaddress'}<br>
    ${'lang.proxy'}: ${'proxy'}<br>
    ${'lang.latitude'}: ${'latitude'}<br>
    ${'lang.longitude'}: ${'longitude'}<br>
    ${'lang.city'}: ${'city'}<br>
    ${'lang.country'}: ${'country'}<br>
    ${'lang.timezone'}: ${'timezone'}<br>
    ${'lang.os'}: ${'os'}<br>
    ${'lang.osarchitecture'}: ${'osarchitecture'}<br>
    ${'lang.os_ver'}: ${'os_ver'}<br>
    ${'lang.browser'}: ${'browser'}<br>
    ${'lang.browser_ver'}: ${'browser_ver'}<br>
    ${'lang.sessionsip'}: ${'sessionsip'}<br>
    <div id="map">MAP</div>
  `;

  // On each forEach iteration attach the button to an element with 
  clientInfo.appendChild(clientInfoElement);
  clientInfoElement.addEventListener('click', function() {
    // fetchMovie(id);
  });
}

// event added to target if = #burger
document.addEventListener('click', function(e){
  if(e.target && e.target.id == 'burger'){
    console.log('listener attached to document');
   }
});


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


// document.addEventListener('click', (e) => {
//   if(e.target && e.target.id == 'movie-link') {
//     console.log('clicked to fetch movie info');
//     fetchMovie(497582);
//   }
// });

// function clickWatch(index) {
//   document.addEventListener('click', function(e) {
//     if(e.target && e.target.id == 'movie-link') {
//       console.log('clicked from closure ', index);
//     }
//   });
// }