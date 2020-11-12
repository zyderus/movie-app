console.log('connected 1_global.js');

// GeoIP provider
const url_geoip = 'https://freegeoip.app/json/';        // 15 000 requests per hour
// Toggle Day and Night mode
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const toggleSwitch = document.querySelector('.theme-checkbox');

if(currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if(currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if(e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Save theme setting to local storage
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
};

toggleSwitch.addEventListener('change', switchTheme, false);
// ------------

// Set Global frontend language locale
const supportedLangs = ['en', 'ru', 'es'];    // List of site supported languages
let locale = getLocale(supportedLangs);
const language = locale;                      // TMDB API locale for fetch 



// Clean up Local Storage of old data on second reload of same session
  // add flag if there is current session ip data
  // if there is flag clean up local storage of data older than 1 month



  // Go back in browser history
function goBack() {
  window.history.back();
}

// Prevent closing on click inside dropdown
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

// Track IP locale
const sessionIpData = async () => {
  const sessionIpObj = sessionStorage.getItem('ipCurrent') || null;
  // if no 'ipCurrent' item in current SESSION then create one
  if (!sessionIpObj) {
    const ipObj = await getFreshData(url_geoip);
    sessionStorage.setItem('ipCurrent', JSON.stringify(ipObj));
    addtoIpHistory(ipObj);
    return ipObj;
  } else {
    const ipData = JSON.parse(sessionStorage.getItem('ipCurrent')) || null;
    return ipData;
  }
}

// View sessionIpData
const ipData = async () => {
  const ipdata = await sessionIpData();
  console.log('from ipdata func: \n', ipdata);
};
ipData();

// Add locale object to localstorage history array
function addtoIpHistory(obj) {
  // If max items then push to last and delete first
  Array.prototype.pushMax = function(value, max) {
    if (this.length >= max) {
      this.shift();
    }
    this.push(value);
  }

  const entries = JSON.parse(localStorage.getItem('ipHistory')) || [];
  entries.pushMax(obj, 10);
  localStorage.setItem('ipHistory', JSON.stringify(entries));
}

// Evaluate preferred language
function getLocale(langArray) {
  let lang;
  if(!getCookie('language')) {
    lang = navigator.languages[0].substring(0, 2);
  } else {
    const index = langArray.indexOf(getCookie('language'));
    lang = index >= 0 ? getCookie('language') : 'en';  // default to english
  }
  return lang;
}

// Parse and get cookie data by keyname
function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Use HTML5 Geolocation
function geoLocate() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }

  function success(position) {
    // for when getting location is a success
    const lat  = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log('latitude', lat, 'longitude', lon);
    reverseGeocode(lat, lon);
  }

  function error() {
    // for when getting location results in an error
    console.error('Cannot retrieve your position. Please enable geolocation in your browser');
    // get your location some other way
  }

  navigator.geolocation.getCurrentPosition(success, error);
}


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

// // Remove class from elements array
// function removeClass(elements) {
//   elements.forEach(element => {
//     element.classList.remove("show");
//   });
// }
/* ======================= */