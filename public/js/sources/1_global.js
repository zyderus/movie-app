console.log('connected 1_global.js');

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
                 
                 

/* ==================================================================================== */
// Detect Location
// ipLookup();

// Lookup IP address via geoip service
async function ipLookup() {
  const url = 'https://freegeoip.app/json/';        // 15 000 requests per hour
  const data = await fetchStartupData(url);
  console.log(data);
}

// Collect weather information
async function weatherLookup() {
  const url = 'https://freegeoip.app/json/';        // 15 000 requests per hour
}

async function fetchStartupData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// Set language based on Accept-Language request HTTP header
let languageCodes = ['sv', 'en', 'es', 'fr', 'dk', 'de', 'cn', 'ru', 'el', 'no'];
console.log('LOCALE: ', Intl.Collator.supportedLocalesOf(languageCodes) );

// Set Language
// const selectedLocale = localStorage.getItem('selectedLocale') ? localStorage.getItem('selectedLocale') : ipLocale;
// const langSelector = document.querySelector('.lang');
// console.log('selectedLocale: ', selectedLocale);

// ------------

// Local Client IP tracking
trackIpHistory();

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
function trackIpHistory() {
  // If max items then push to last and delete first
  Array.prototype.pushMax = function(value, max) {
    if (this.length >= max) {
      this.shift();
    }
    this.push(value);
  }
  
  const ipObj = { ip: '23.89.183.80', country: 'Russia', city: 'Tashkent', pcname: 'BEAST', os: 'Windows', app: 'Chrome', time: Date.now() };

  if (!sessionStorage.getItem('ipCurrent')) {
    console.log('There is no ip Data for this session');
    sessionStorage.setItem('ipCurrent', JSON.stringify(ipObj));

    // extract ip history array from local storage and add new ip, resave
    ipHistory(ipObj);
  } else {
    const ipData = JSON.parse(sessionStorage.getItem('ipCurrent')) || null;
    console.log('there is IP data: ', ipData);
  }
}

// Add locale object to localstorage history array
async function ipHistory(obj) {
  const entries = JSON.parse(localStorage.getItem('ipHistory')) || [];
  entries.pushMax(obj, 10);
  localStorage.setItem('ipHistory', JSON.stringify(entries));

  console.log('added.................');
}

// Evaluate preferred language
function getLocale(langsArray) {
  let lang;

  if(!getCookie('language')) {
    lang = navigator.languages[0].substring(0, 2);
  } else {
    const index = supportedLangs.indexOf(getCookie('language'));
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