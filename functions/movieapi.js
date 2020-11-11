const fetch = require('node-fetch');

const cache = [];                     // Setup cache for requested API data
const cachingInterval = 30 * 1000;    // 30s

// Read and Write cache data
const writeToCache = (url, data, index) => typeof index === 'undefined' || index < 0
                    ? cache.push({ url, data }) : cache[index] = { url, data };
const readFromCache = url => cache.findIndex(obj => obj.url === url);

// Fetch data from API, add timestamp, write to cache and return
const getFreshData = async (url, index) => {
  const response = await fetch(url);
  let data = await response.json();
  data.proxy_time = Date.now();

  writeToCache(url, data, index);
  return data;
};

// Fetch logic
const fetchData = async (url) => {
  const index = readFromCache(url);
  const cachedData = cache[index];

  if(cachedData && cachedData.data.proxy_time > Date.now() - cachingInterval) {
    // setTimeout(() => {console.log('timeout cache: ', cache)}, 2000);

    return cachedData.data;
  } else {
    const data = await getFreshData(url, index);
    // setTimeout(() => {console.log('timeout cache: ', cache)}, 2000);

    return data;
  }
};

module.exports = {
  writeToCache,
  readFromCache,
  getFreshData,
  fetchData,
};



/* FLAWED SOLUTIONS */

// const cache = (typeof cacheMT === 'undefined') ? undefined : 
// cacheMT.findIndex(entry => {
//   return entry.language.toLowerCase() === language.toLowerCase();
// });

// /* INSIDE A ROUTE */
// const language = req.query.language || null;
// const params = new URLSearchParams({
//   api_key: process.env.TMDB_KEY,
//   language,
//   include_adult: false
// });
// const url = `https://api.themoviedb.org/3/movie/upcoming?`;

// // if now more than now minus 30 seconds, then respond with cached data
// // some half-witted scruffy looking algo
// if(language === "ru-RU") {
//   if (cacheTUruTime && cacheTUruTime > Date.now() - 30 * 1000) {
//     console.log('Upcoming ru ', cacheTUruTime)
//     return res.json(cacheTUru);
//   }
// } else if(language === "es-ES") {
//   if (cacheTUesTime && cacheTUesTime > Date.now() - 30 * 1000) {
//     console.log('Upcoming es ', cacheTUesTime)
//     return res.json(cacheTUes);
//   }
// } else {
//   if (cacheTUenTime && cacheTUenTime > Date.now() - 30 * 1000) {
//     console.log('Upcoming en ', cacheTUenTime)
//     return res.json(cacheTUen);
//    }
// }

// try {
//   // fetch api
//   const response = await fetch(url + params);
//   const data = await response.json();

//   // send received api data to client
//   // some more crap algo
//   if(language === "ru-RU") {
//     cacheTUru = data;            
//     cacheTUruTime = Date.now();     
//     data.cacheTUruTime = cacheTUruTime;  
//   } else if(language === "es-ES") {
//     cacheTUes = data;           
//     cacheTUesTime = Date.now();      
//     data.cacheTUesTime = cacheTUesTime; 
//   } else {
//     cacheTUen = data;          
//     cacheTUenTime = Date.now();      
//     data.cacheTUenTime = cacheTUenTime;  
//   }
//   return res.json(data);
// } catch (error) {
//   return next(error);
// }