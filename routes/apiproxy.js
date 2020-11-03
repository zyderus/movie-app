const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();


router.get('/test', (req, res) => {
  res.render('movies/test');
});

// Search movies (TMDb API)
router.get('/movies/search', async (req, res, next) => {
  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language: req.query.language,
    query: req.query.query,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/search/movie?`;

  console.log('search: ', url + params);
  
  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// Movies info (TMDb API)
// let cachedDataMI;
// let cacheTimeMI;
router.get('/movies/movieinfo/:id', async (req, res, next) => {
  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language: req.query.language,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/movie/${req.params.id}?`;

  console.log('movie Info: ', url + params);
  
  // // if now more than now minus 30 seconds, then respond with cached data
  // if (cacheTimeMI && cacheTimeMI > Date.now() - 30 * 1000) {
  //   return res.json(cachedDataMI);
  // }
  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();

    // send received api data to client
    // cachedDataMI = data;             // set entry
    // cacheTimeMI = Date.now();        // set cache entry time
    // data.cacheTimeMI = cacheTimeMI;  // add timestamp property to data
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// Movies Trending (TMDb API)
let cacheMTen;
let cacheMTru;
let cacheMTes;
let cacheMTenTime;
let cacheMTruTime;
let cacheMTesTime;
router.get('/movies/trending', async (req, res, next) => {
  language = req.query.language;

  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/trending/movie/day?`;

  // if now more than now minus 30 seconds, then respond with cached data
  // some half-witted scruffy looking algo
  if(language === "ru-RU") {
    if (cacheMTruTime && cacheMTruTime > Date.now() - 30 * 1000) {
      console.log('trending ru ', cacheMTruTime)
      return res.json(cacheMTru);
    }
  } else if(language === "es-ES") {
    if (cacheMTesTime && cacheMTesTime > Date.now() - 30 * 1000) {
      console.log('trending es ', cacheMTesTime)
      return res.json(cacheMTes);
    }
  } else {
    if (cacheMTenTime && cacheMTenTime > Date.now() - 30 * 1000) {
      console.log('trending en ', cacheMTenTime)
      return res.json(cacheMTen);
     }
  }

  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();

    // send received api data to client
    // some more crap algo
    if(language === "ru-RU") {
      cacheMTru = data;            
      cacheMTruTime = Date.now();     
      data.cacheMTruTime = cacheMTruTime;  
    } else if(language === "es-ES") {
      cacheMTes = data;           
      cacheMTesTime = Date.now();      
      data.cacheMTesTime = cacheMTesTime; 
    } else {
      cacheMTen = data;          
      cacheMTenTime = Date.now();      
      data.cacheMTenTime = cacheMTenTime;  
    }
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// Movies Popular (TMDb API)
let cacheMPen;
let cacheMPru;
let cacheMPes;
let cacheMPenTime;
let cacheMPruTime;
let cacheMPesTime;
router.get('/movies/popular', async (req, res, next) => {
  language = req.query.language;

  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/movie/popular?`;

  console.log(url + params);

  // if now more than now minus 30 seconds, then respond with cached data
  // some half-witted scruffy looking algo
  if(language === "ru-RU") {
    if (cacheMPruTime && cacheMPruTime > Date.now() - 30 * 1000) {
      console.log('Popular ru ', cacheMPruTime)
      return res.json(cacheMPru);
    }
  } else if(language === "es-ES") {
    if (cacheMPesTime && cacheMPesTime > Date.now() - 30 * 1000) {
      console.log('Popular es ', cacheMPesTime)
      return res.json(cacheMPes);
    }
  } else {
    if (cacheMPenTime && cacheMPenTime > Date.now() - 30 * 1000) {
      console.log('Popular en ', cacheMPenTime)
      return res.json(cacheMPen);
     }
  }

  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();

    // send received api data to client
    // some more crap algo
    if(language === "ru-RU") {
      cacheMPru = data;            
      cacheMPruTime = Date.now();     
      data.cacheMPruTime = cacheMPruTime;  
    } else if(language === "es-ES") {
      cacheMPes = data;           
      cacheMPesTime = Date.now();      
      data.cacheMPesTime = cacheMPesTime; 
    } else {
      cacheMPen = data;          
      cacheMPenTime = Date.now();      
      data.cacheMPenTime = cacheMPenTime;  
    }
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// Theaters Now Playing (TMDb API)
let cacheTNen;
let cacheTNru;
let cacheTNes;
let cacheTNenTime;
let cacheTNruTime;
let cacheTNesTime;
router.get('/theaters/nowplaying', async (req, res, next) => {
  language = req.query.language;

  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/movie/now_playing?`;

  // if now more than now minus 30 seconds, then respond with cached data
  // some half-witted scruffy looking algo
  if(language === "ru-RU") {
    if (cacheTNruTime && cacheTNruTime > Date.now() - 30 * 1000) {
      console.log('Now Playing ru ', cacheTNruTime)
      return res.json(cacheTNru);
    }
  } else if(language === "es-ES") {
    if (cacheTNesTime && cacheTNesTime > Date.now() - 30 * 1000) {
      console.log('Now Playing es ', cacheTNesTime)
      return res.json(cacheTNes);
    }
  } else {
    if (cacheTNenTime && cacheTNenTime > Date.now() - 30 * 1000) {
      console.log('Now Playing en ', cacheTNenTime)
      return res.json(cacheTNen);
     }
  }

  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();

    // send received api data to client
    // some more crap algo
    if(language === "ru-RU") {
      cacheTNru = data;            
      cacheTNruTime = Date.now();     
      data.cacheTNruTime = cacheTNruTime;  
    } else if(language === "es-ES") {
      cacheTNes = data;           
      cacheTNesTime = Date.now();      
      data.cacheTNesTime = cacheTNesTime; 
    } else {
      cacheTNen = data;          
      cacheTNenTime = Date.now();      
      data.cacheTNenTime = cacheTNenTime;  
    }
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

// Theaters Upcoming Movies (TMDb API)
let cacheTUen;
let cacheTUru;
let cacheTUes;
let cacheTUenTime;
let cacheTUruTime;
let cacheTUesTime;
router.get('/theaters/upcoming', async (req, res, next) => {
  language = req.query.language;

  // api url
  const params = new URLSearchParams({
    api_key: process.env.TMDB_KEY,
    language,
    include_adult: false
  });
  const url = `https://api.themoviedb.org/3/movie/upcoming?`;

  // if now more than now minus 30 seconds, then respond with cached data
  // some half-witted scruffy looking algo
  if(language === "ru-RU") {
    if (cacheTUruTime && cacheTUruTime > Date.now() - 30 * 1000) {
      console.log('Upcoming ru ', cacheTUruTime)
      return res.json(cacheTUru);
    }
  } else if(language === "es-ES") {
    if (cacheTUesTime && cacheTUesTime > Date.now() - 30 * 1000) {
      console.log('Upcoming es ', cacheTUesTime)
      return res.json(cacheTUes);
    }
  } else {
    if (cacheTUenTime && cacheTUenTime > Date.now() - 30 * 1000) {
      console.log('Upcoming en ', cacheTUenTime)
      return res.json(cacheTUen);
     }
  }

  try {
    // fetch api
    const response = await fetch(url + params);
    const data = await response.json();

    // send received api data to client
    // some more crap algo
    if(language === "ru-RU") {
      cacheTUru = data;            
      cacheTUruTime = Date.now();     
      data.cacheTUruTime = cacheTUruTime;  
    } else if(language === "es-ES") {
      cacheTUes = data;           
      cacheTUesTime = Date.now();      
      data.cacheTUesTime = cacheTUesTime; 
    } else {
      cacheTUen = data;          
      cacheTUenTime = Date.now();      
      data.cacheTUenTime = cacheTUenTime;  
    }
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;




// const cache = (typeof cacheMT === 'undefined') ? undefined : 
// cacheMT.findIndex(entry => {
//   return entry.language.toLowerCase() === language.toLowerCase();
// });