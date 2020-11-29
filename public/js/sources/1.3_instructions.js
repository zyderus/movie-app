console.log('instructions.js');

// Toggle day and night themes
toggleSwitch.addEventListener('change', switchTheme, false);

// Set Theme according to sunrise and sunset times
const autoTheme = async () => {
  const suntimes = await getSunTimes();
  conditionTheme(suntimes.sunrise, suntimes.sunset);
};

// Set Theme
const setTheme = (() => {
  if (!currentTheme) {
    autoTheme();
  }
})();

// Check if day or night every 15 mins. Sets theme in auto mode
setInterval(() => {
  if (!currentTheme) {
    autoTheme();
  }
}, 1000 * 60 * 15);

// Prevent closing on click inside dropdown
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', e => {
    e.stopPropagation();
  });
});

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
