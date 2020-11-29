const { languages } = require('../locale/strings');
const defaultSuntimes = { sunrise: 700, sunset: 2200 }; // 7:00 and 20:00
/* --- Middleware --- */

// Parse cookie
function getcookies(req, res, next) {
  if (!req.headers.cookie) {
    return next();
  }
  const cookies = req.headers.cookie.split('; ');
  req.cookies = {};
  if (cookies) {
    cookies.forEach(cookie => {
      const arr = cookie.split('=');
      req.cookies[arr[0]] = arr[1];
    });
  }
  next();
}

// Evaluate preferred language
function getLocale(req, res, next) {
  // List of site supported languages
  const supportedLangs = ['en', 'ru', 'es'];
  if (req.cookies) {
    // Logic to set Language
    if (!req.cookies.language) {
      const lang = req.acceptsLanguages(supportedLangs);
      const selectedLang = lang ? lang : 'en'; // default to english
      req.eval_language = languages[selectedLang];
      req.lang = selectedLang;
    } else {
      const index = supportedLangs.indexOf(req.cookies.language);
      const cookieLang = index >= 0 ? req.cookies.language : 'en'; // default to english
      req.eval_language = languages[cookieLang];
      req.lang = cookieLang;
    }
    // Logic to set Theme
    if (req.cookies.theme) {
      req.theme = req.cookies.theme;
    } else if (!req.cookies.theme && req.cookies.suntimes) {
      req.theme = conditionTheme(JSON.parse(req.cookies.suntimes));
    } else {
      req.theme = conditionTheme(defaultSuntimes);
    }
    return next();
  } else {
    // If no cookies present
    const lang = req.acceptsLanguages(supportedLangs);
    const selectedLang = lang ? lang : 'en'; // default to english
    req.eval_language = languages[selectedLang];
    req.lang = selectedLang;
    req.theme = conditionTheme(defaultSuntimes);
    return next();
  }
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
const conditionTheme = suntimes => {
  const now = timeFormat(new Date());
  const isDay = now > suntimes.sunrise && now < suntimes.sunset;
  return isDay ? 'light' : 'dark';
};

module.exports = {
  getcookies,
  getLocale,
};
