console.log('instructions.js');

// Set Theme according to sunrise and sunset times
const autoTheme = async () => {
  const suntimes = await getSunTimes();
  conditionTheme(suntimes.sunrise, suntimes.sunset);
};

// Set Theme
const setTheme = (() => {
  if (!userTheme) {
    autoTheme();
  } else {
    getSunTimes();
  }
})();

// Check if day or night every 15 mins. Sets theme in auto mode
setInterval(() => {
  if (!userTheme) {
    autoTheme();
  }
}, 1000 * 60 * 15);

// Switch theme on toggle switch
function switchTheme(e) {
  document.querySelector('body').style.transition = 'background var(--transition-speed) linear';
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    // localStorage.setItem('theme', 'dark');
    document.cookie = 'theme=dark';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    // localStorage.setItem('theme', 'light');
    document.cookie = 'theme=light';
  }
}

// Reload with Register modal tab open if client-side validation fails
if (sessionStorage.getItem('regformErrors') === 'true') {
  document.addEventListener('DOMContentLoaded', () => {
    authModal.show();
    registerTab.show();
  });
}
// Prevent reOpening registration form on reload
sessionStorage.setItem('regformErrors', false);

// If login fails open login modal
if (sessionStorage.getItem('loginErrors') === 'true') {
  document.addEventListener('DOMContentLoaded', () => {
    authModal.show();
    loginTab.show();
  });
}
// Prevent reOpening login form on reload
sessionStorage.setItem('loginErrors', false);

// Redirect to home directory on Authorization modal close if in subdirectories
if (location.pathname != '/') {
  document.querySelector('#auth-modal').addEventListener('hide.bs.modal', e => {
    console.log('hida maida');
    window.location.href = '/';
  });
}
