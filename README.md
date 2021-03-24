# Movie Information Webapp

### Features
- Latest movie and tv show information 
- Multi-lingual trailers
- Client positioning via geoIP service or browsers geolocation API
- Location and directions to movie theaters near you
- Weather information based on user's location
- Manual or Automatic multilangual content based on user's system locale
- Content adjusts to a client browser and operating system
- Automatic Day and Night Mode based on the sunrise and sunset data collected from weather api
- Day and Night mode trigger delivered via cookie. So there are no anoying flashes on first page load
- To reduce server load and minimize load times all API requests are cached locally and in server memory. Also this helps to keep api requests within service providers limits. Caching algorithms comply with api provider's terms of service.
- Funky color themes

### Technologies
**Frontend:** Vanilla Javascript and HTML/CSS/Bootstrap  
**Backend:** NodeJS with Express, MongoDB with Mongoose  

### APIs
- TMDB
- OpenWeatherMaps
- FreeGEOIP
- Google Recaptcha
- Google Geocoder
- Google Maps
- Gmail
- Youtube Data


Open in your browser: [movie app](https://watch-movies-app.herokuapp.com/)
