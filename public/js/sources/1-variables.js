console.log('connected variables.js');

// Links to Login and Register tabs in Modal Window
const reglink = document.querySelector('#register-link');
const loginlink = document.querySelector('#login-link');
// Modal tabs variables
const triggerEl = document.querySelector('#myTab a[href="#register-tab-page"]');
const triggerEl2 = document.querySelector('#myTab a[href="#login-tab-page"]');
const tabTrigger = new bootstrap.Tab(triggerEl);
const tabTrigger2 = new bootstrap.Tab(triggerEl2);

// API variables
const api_key = 'f23a624fd8704f7b8261ca835ef4e069';
const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const img_path = 'https://image.tmdb.org/t/p/w300';
const search_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&query=`;
const trending_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
const img_path_hires = 'https://image.tmdb.org/t/p/w1280';
const movie_url = `https://api.themoviedb.org/3/movie/`
const movie_url_options = `?api_key=${api_key}&language=en-US`;

const marqueeReel = document.querySelector('.marquee-content');
const gallery = document.querySelector('.carousel-inner');
const galleryThumbnails = document.querySelector('.carousel-indicators');
const main = document.querySelector('main');
const section = document.querySelector('section');
const searchContainerMain = document.querySelector('#search-container-main');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const header = document.querySelector('header');

// Registration form vars
const regform = document.querySelector('#register-form');
const regemail = document.querySelector('#reg-email');
const regpassword = document.querySelector('#reg-password');
const regbutton = document.querySelector('#btn-register');

// Email errors from backend validation
const emailerr = document.querySelector('.email-error');
const emailsmall = document.querySelector('.email-small');

// Register form password visibility toggle
const hideBtns = document.querySelectorAll('.toggle-hide');

// Registration form Monitor errors
let registrationErrors = {
  emailbackend: true,
  email: true,
  password: true,
  recaptcha: true
};