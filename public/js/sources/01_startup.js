console.log('startup.js');

const currentTheme = getCookie('theme') || null;
const toggleSwitch = document.querySelector('.theme-checkbox');

// Set Global frontend language locale
const supportedLangs = ['en', 'ru', 'es']; // List of site supported languages
let locale = getLocale(supportedLangs);
const language = locale; // TMDB API locale for fetch

// Default caching interval
const cacheInterval = 1000 * 60 * 60;
