<div align="center">
  <h2>Tron Movies</h2>
  <strong>Version 1.5.0</strong>
</div>

<p align="center">
  View @ https://watch-movies-app.herokuapp.com/ | hosted with <a href="https://id.heroku.com/">heroku</a>
</p>

<p align="center">
  
</p>

<div align="center">
  <img src="https://github.com/zyderus/portfolio/blob/main/public/assets/images/tron.png" width="100%">
</div>

## Description
A movies information portal with easily accesible relevant information

## Tech
Express, Mongo, Mongoose, Gulp, Bootstrap

## Getting Started

### 🛠 Installation & Set Up

1. Installation

   ```sh
   npm install
   ```

2. Run the development server

   ```sh
   gulp
   ```

3. Build for Production

   ```sh
   gulp build
   ```
   
---

### Features
- Latest movie and tv show information 
- Multilingual trailers
- Client positioning via geoIP service or browsers geolocation API
- Location and directions to movie theaters near you
- Weather information based on user's location
- Automatic language selection for the content. Based on user's system locale
- Or manually choose a language of your choice 
- Content adjusts to a client browser and operating system
- Automatic Day and Night Mode based on the sunrise and sunset data collected from weather api
- Day and Night mode trigger delivered via cookie. So there are no anoying flashes on first page load
- To reduce server load and minimize load times all API requests are cached locally and in server memory. Also this helps to keep api requests within service providers limits. Caching algorithms comply with api provider's terms of service.
- Funky color themes

### APIs
- TMDB
- OpenWeatherMaps
- FreeGEOIP
- Google Recaptcha
- Google Geocoder
- Google Maps
- Gmail
- Youtube Data
   
---

## Contributors

- Rustam Ziyadov

---

## License & copyright

&copy; Rustam Ziyadov
