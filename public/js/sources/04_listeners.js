console.log('listeners.js');

// Toggle day and night themes
toggleSwitch.addEventListener('change', switchTheme, false);

// Prevent closing on click inside dropdown
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', e => {
    e.stopPropagation();
  });
});

// Search movies (no caching)
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchValue = searchInput.value;
  const url = url_search + searchValue + '&' + url_params;

  if (searchValue) {
    clearPage();

    const data = await fetchData(url).then(res => res.results);
    const searchSection = document.querySelector('.search-results');
    toSection(searchSection, data);
    searchInput.value = '';
  }
});
