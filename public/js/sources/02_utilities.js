console.log('utilities.js');

// Parse and get cookie data by keyname
function getCookie(cname) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// Evaluate preferred language
function getLocale(langArray) {
  let lang;
  if (!getCookie('language')) {
    lang = navigator.languages[0].substring(0, 2);
  } else {
    const index = langArray.indexOf(getCookie('language'));
    lang = index >= 0 ? getCookie('language') : 'en'; // default to english
  }
  return lang;
}

// Format Date object to hrs mins integer (military format like)
const timeFormat = ms => {
  let h = ms.getHours().toString();
  let m = ms.getMinutes().toString();
  h = checkTime(h);
  m = checkTime(m);
  return parseInt(h + m);

  // Add leading 0s
  function checkTime(i) {
    return i < 10 ? (i = '0' + i) : i;
  }
};

// Set theme depending on sun position
const conditionTheme = (sunrise, sunset) => {
  const now = timeFormat(new Date());
  const isDay = now > sunrise && now < sunset;
  isDay ? dayTheme() : nightTheme();
};

// set Day Theme
const dayTheme = () => {
  document.documentElement.setAttribute('data-theme', 'light');
  toggleSwitch.checked = false;
};

// set Night Theme
const nightTheme = () => {
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleSwitch.checked = true;
};

// Go back in browser history
const goBack = () => {
  window.history.back();
};

// Read and Write data to local storage
const writeToCache = (url, data) => localStorage.setItem(url, JSON.stringify(data));
const readFromCache = url => JSON.parse(localStorage.getItem(url)) || null;

// Fetch new data
const fetchFresh = async url => {
  try {
    const res = await fetch(url);
    const valid = res.ok ? res : new Error(res.statusText);
    const data = await valid.json();
    data.time = Date.now();
    return data;
  } catch (err) {
    console.log('error:', err);
  }
};

// Fetch Fresh or Cached Data
const fetchData = async (url, interval = cacheInterval, cache = true) => {
  const cacheData = readFromCache(url);
  if (cacheData && cacheData.time > Date.now() - interval) {
    return cacheData;
  } else {
    const data = await fetchFresh(url);
    // Cache data if cache option set to true and there is data
    if (cache && data) {
      writeToCache(url, data);
    }
    // If unable to fetch data from API then use cache data
    return data ? data : cacheData;
  }
};

// Fetch movie details by Id
const fetchMovie = async movieId => {
  const url = `${url_movieInfo + movieId}?${url_params}`;
  const data = await fetchData(url);
  watchMovie(data);
};

// Receive coordinates via GeoIP service
const getGeoip = () => {
  const url = 'https://freegeoip.app/json/'; // 15 000 requests per hour
  const cacheInterval = 1000 * 60 * 30; // 30 minutes
  return fetchData(url, cacheInterval);
};

// Receive coordinates via Browser's geolocation
const getLocation = async () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

// Get latitude and longitude
const getCoords = async () => {
  const permission = await navigator.permissions.query({ name: 'geolocation' });
  if (navigator.geolocation && permission.state == 'granted') {
    console.log('from navigator.geolocation...');
    try {
      const location = await getLocation();
      return {
        latitude: parseFloat(location.coords.latitude.toFixed(4)),
        longitude: parseFloat(location.coords.longitude.toFixed(4)),
      };
    } catch (err) {
      console.log('ERRORS...', err);
      return getGeoip();
    }
  } else {
    console.log('from geoIP...');
    return getGeoip();
  }
};

// Collect local Weather data based on latitude and longitude from GeoIP data
const getWeather = async data => {
  const coords = { lat: data.latitude, lon: data.longitude };
  // save coordinates in variable
  coordinates = coords;
  const key = '73ccfb39651ee95f5ba9a7a7ae60941a';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=ru&appid=${key}`;
  return await fetchData(url);
};

// Get sunrise and sunset times based on weather data
const getSunTimes = async () => {
  try {
    const geoip = await getCoords();
    const weather = await getWeather(geoip);
    const suntimes = {
      sunrise: timeFormat(new Date(weather.sys.sunrise * 1000)),
      sunset: timeFormat(new Date(weather.sys.sunset * 1000)),
    };
    document.cookie = 'suntimes=' + JSON.stringify(suntimes) + '; Max-Age=' + 60 * 60 * 24;
    return suntimes;
  } catch (err) {
    console.log('new ERRORs...', err.message);
  }
};

// Clear page of data
const clearPage = () => {
  header.innerHTML = '';
  sections.forEach(section => {
    section.innerHTML = '';
  });
};

// Evaluate movie rating scores
const getClassByRate = rate => {
  if (rate == 0) {
    return {
      class: 'hide',
    };
  } else if (rate >= 7) {
    return {
      class: 'green',
      star: 'fas fa-star',
    };
  } else if (rate > 5) {
    return {
      class: 'orange',
      star: 'fas fa-star-half',
    };
  } else {
    return {
      class: 'red',
      star: 'far fa-star',
    };
  }
};

// Track IP lookup
const sessionIpData = async url => {
  const sessionIpObj = sessionStorage.getItem(url) || null;
  // if no url-named item in current SESSION then create one
  if (!sessionIpObj) {
    const ipObj = await fetchFresh(url);
    sessionStorage.setItem(url, JSON.stringify(ipObj));
    addtoIpHistory(ipObj);
    return ipObj;
  } else {
    const ipData = JSON.parse(sessionStorage.getItem(url)) || null;
    return ipData;
  }
};

// Add locale object to localstorage history array
function addtoIpHistory(obj) {
  // If max items then push to last and delete first
  Array.prototype.pushMax = function (value, max) {
    if (this.length >= max) {
      this.shift();
    }
    this.push(value);
  };

  const entries = JSON.parse(localStorage.getItem('ipHistory')) || [];
  entries.pushMax(obj, 10);
  localStorage.setItem('ipHistory', JSON.stringify(entries));
}

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
