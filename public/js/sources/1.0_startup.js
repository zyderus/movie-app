console.log('startup.js');

const currentTheme = getCookie('theme') || null;
// const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const toggleSwitch = document.querySelector('.theme-checkbox');

console.log('cookie theme', currentTheme);

// // Immediately set Theme based on previous cache data if exists, otherwise use defaults. Then evaluate the following code
// const initialTheme = (() => {
//   if (currentTheme) {
//     document.documentElement.setAttribute('data-theme', currentTheme);
//     if (currentTheme === 'light') {
//       toggleSwitch.checked = true;
//     }
//   } else {
//     conditionTheme(700, 2000);
//   }
// })();
