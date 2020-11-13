console.log('connected 4.5_profile.js');


const url_weatherInfo = `/api/weather?`;
const weather = document.querySelector('.weather-data');
const clientInfo = document.querySelector('.client-data');

// Init Profiles page
const profileInit = async () => {
  if (window.location.href.indexOf('/profile/') != -1) {
    const ipdata = await sessionIpData(geoip_url);

    console.log(ipdata);

    showWeather(ipdata);
    showClientside(ipdata);
  }
}

profileInit();

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


function toWeather(data) {
  if(data.length < 1) {
    weather.innerHTML = '';
    weather.innerHTML = `<div>No Weather Data</div>`;
    return;
  }
  weather.innerHTML = '';
  weather.innerHTML = `<div><strong>Weather Info with OpenWeatherMap:</strong></div>`

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
  clientInfo.innerHTML = `<div><strong>Clientside Collected Info with freegeoip.app:</strong></div>`

  const ip = data.ip;
  const latitude = data.latitude;
  const longitude = data.longitude;
  const city = data.city;
  const country = data.country_name;
  const timezone = data.time_zone;

  const os = data.os;
  const osarchitecture = data.osarch;
  const os_ver = data.osversion;
  const browser = data.browser;
  const browser_ver = data.browser_ver;
  const sessionsip = data.sessionsip;
  const proxy = data.proxy;


  const clientInfoElement = document.createElement('div');
  clientInfoElement.classList.add('client-info');
  clientInfoElement.innerHTML = `
    ${'lang.ipaddress'}: ${ip}<br>
    ${'lang.latitude'}: ${latitude}<br>
    ${'lang.longitude'}: ${longitude}<br>
    ${'lang.city'}: ${city}<br>
    ${'lang.country'}: ${country}<br>
    ${'lang.timezone'}: ${timezone}<br>
    ---  ---  --- <br>
    ${'lang.proxy'}: ${'proxy'}<br>
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