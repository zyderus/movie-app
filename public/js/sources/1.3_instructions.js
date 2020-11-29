console.log('instructions.js');

// Toggle day and night themes
toggleSwitch.addEventListener('change', switchTheme, false);

// Set Theme according to sunrise and sunset times
const autoTheme = async () => {
  const suntimes = await getSunTimes();
  // console.log('\n now:', now, '\n suntimes:', suntimes);
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
