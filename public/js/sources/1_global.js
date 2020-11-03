console.log('connected 1_global.js');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const toggleSwitch = document.querySelector('.theme-checkbox');

if(currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if(currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if(e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Save theme setting to local storage
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
};

toggleSwitch.addEventListener('change', switchTheme, false);

// Go back in browser history
function goBack() {
  window.history.back();
}

// Prevent closing on click inside dropdown
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});


/* OPEN DROPDOWNS ON HOVER */
// // Vars
// const dropdowns = document.querySelectorAll('nav .dropdown');
// const dropdownMenus = document.querySelectorAll('nav .dropdown-menu');

// // Open dropdown menu on hover
// dropdowns.forEach(dropdown => {
//   const dropdownMenu = dropdown.querySelector('.dropdown-menu');
//   dropdown.addEventListener('mouseover', () => {
//     removeClass(dropdownMenus);
//     if(window.getComputedStyle(dropdownMenu).visibility === "visible") {
//       dropdownMenu.classList.add("show");
//     // }
//   });
// });

// // Remove class from elements array
// function removeClass(elements) {
//   elements.forEach(element => {
//     element.classList.remove("show");
//   });
// }
/* ======================= */