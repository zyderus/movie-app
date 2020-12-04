console.log('startup.js');

const userTheme = getCookie('theme') || null;

let currentTheme = document.documentElement.getAttribute('data-theme');
console.log('theme', currentTheme);


const toggleSwitch = document.querySelector('.theme-checkbox');

// Set Global frontend language locale
const supportedLangs = ['en', 'ru', 'es']; // List of site supported languages
let locale = getLocale(supportedLangs);
const language = locale; // TMDB API locale for fetch

// Default caching interval
const cacheInterval = 1000 * 60 * 60;

// Geo coordinates
let coordinates;




// // Monitor for DOM changes
// let mutationObserver = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     console.log(mutation);
//   })
// })

// // Starts listening for changes in the root HTML element of the page.
// mutationObserver.observe(document.documentElement, {
//   attributes: true,
// });