console.log('startup.js');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const toggleSwitch = document.querySelector('.theme-checkbox');

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

// Switch theme on toggle switch
function switchTheme(e) {
  document.querySelector('body').style.transition = 'background var(--transition-speed) linear';
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}
