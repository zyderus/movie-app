console.log('startup.js');

const currentTheme = getCookie('theme') || null;
const toggleSwitch = document.querySelector('.theme-checkbox');
