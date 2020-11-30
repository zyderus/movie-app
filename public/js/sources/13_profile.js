console.log('connected 4.5_profile.js');

const url_weatherInfo = `/api/weather?`;
const weather = document.querySelector('.weather-data');
const clientInfo = document.querySelector('.client-data');

// Check if in Profiles page
if (window.location.href.indexOf('/profile/') != -1) {
  document.addEventListener('DOMContentLoaded', profileInit());
}

// Init Profiles page
async function profileInit() {
  const ipdata = await sessionIpData('https://freegeoip.app/json/');
  showWeather(ipdata);
  showClientside(ipdata);
}

// Display Weather info
async function showWeather(data) {
  if (weather) {
    const params = new URLSearchParams({
      lat: data.latitude,
      lon: data.longitude,
      units: 'metric', // "metric", "imperial", "kelvin"
      lang: language,
    });
    const resdata = await fetchData(url_weatherInfo + params);
    toWeather(resdata);
  }
}

// Display Clientside info
async function showClientside(data) {
  if (clientInfo) {
    let browser_geolocation = false;

    if (true) {
    } else {
    }

    toClientInfo(data);

    // console.log('received weather data: ', "resdata");
  }
}

function toWeather(data) {
  if (data.length < 1) {
    weather.innerHTML = '';
    weather.innerHTML = `<div>No Weather Data</div>`;
    return;
  }
  weather.innerHTML = '';
  weather.innerHTML = `<div><strong>Weather Info with OpenWeatherMap:</strong></div>`;

  const lang = data.locale;
  const city = data.name;
  const temp = data.main.temp;
  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;

  const weatherElement = document.createElement('div');
  weatherElement.classList.add('weather');
  weatherElement.innerHTML = `
    ${lang.city}: ${city}<br>
    ${lang.temp}: ${temp} &deg;C <br>
    ${desc}<br>
    <img class="weather-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png"> <br>
  `;

  // On each forEach iteration attach the button to an element with
  weather.appendChild(weatherElement);
  weatherElement.addEventListener('click', function () {
    // fetchMovie(id);
  });
}

// Display ClienInfo
function toClientInfo(data) {
  const spans = document.querySelectorAll('.client-data span');
  spans[0].innerHTML = data.ip;
  spans[1].innerHTML = data.latitude;
  spans[2].innerHTML = data.longitude;
  spans[3].innerHTML = data.city;
  spans[4].innerHTML = data.country_name;
  spans[5].innerHTML = data.time_zone;
}
