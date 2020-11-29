console.log('connected 1_global.js');

// Toggle Day and Night mode
// let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// const toggleSwitch = document.querySelector('.theme-checkbox');

// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);

//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// } else {
//   autoThemeMode();
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     // Save theme setting to local storage
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }
// }

// toggleSwitch.addEventListener('change', switchTheme, false);

// function autoThemeMode() {
//   now = new Date().getHours();

//   if (now > 19 || now < 7) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     toggleSwitch.checked = true;

//     console.log('auto night mode');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     toggleSwitch.checked = false;

//     console.log('auto day mode');
//   }
// }

// // Check if day or night every 15 mins. Sets theme in auto mode
// setInterval(() => {
//   currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
//   if (!currentTheme) {
//     autoThemeMode();
//   }
// }, 1000 * 60 * 15);

// ------------

// Set Global frontend language locale
const supportedLangs = ['en', 'ru', 'es']; // List of site supported languages
let locale = getLocale(supportedLangs);
const language = locale; // TMDB API locale for fetch

// Clean up Local Storage of old data on second reload of same session
// add flag if there is current session ip data
// if there is flag clean up local storage of data older than 1 month

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

console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

// // Use HTML5 Geolocation
// function geoLocate() {
//   if (!navigator.geolocation) {
//     console.log('Geolocation is not supported by your browser');
//     return;
//   }

//   function success(position) {
//     // for when getting location is a success
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     console.log('latitude', lat, 'longitude', lon);
//     // reverseGeocode(lat, lon);
//   }

//   function error() {
//     console.error();
//     // get your location some other way with function
//   }

//   navigator.geolocation.getCurrentPosition(success, error); // options: optional
// }

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
