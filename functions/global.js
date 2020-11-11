const { languages } = require('../locale/strings');

/* --- Middleware --- */

// Parse cookie
function getcookies(req, res, next) {
  if(!req.headers.cookie) {
    return next();
  }
  const cookies = req.headers.cookie.split('; ');
  req.cookies = {};
  if(cookies) {
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

  if(!req.cookies || !req.cookies.language) {
    const lang = req.acceptsLanguages(supportedLangs);
    const selectedLang = lang ? lang : 'en';  // default to english
    req.eval_language = languages[selectedLang];
    return next();
  } else {
    const index = supportedLangs.indexOf(req.cookies.language);
    const cookieLang = index >= 0 ? req.cookies.language : 'en';  // default to english
    req.eval_language = languages[cookieLang];
    return next();
  }
}


module.exports = {
  getcookies,
  getLocale,
};