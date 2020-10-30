// Show movie information in Movie Column of Movie Megamenu
const showMegamenuMovie = movie => {
  const movieCol = document.querySelector('.movie-column');
  
  movieCol.innerHTML = '';

  if(!movie) {
    main.innerHTML = `<div class="section-title">Movie info not available<span class="section-backlogo">Movie info not available</span></div>`;
    return false;
  }

  const { title, 
          poster_path,
          vote_average, 
          overview,
          release_date,
          genre_ids,
          id
        } = movie;

  const movieElement = document.createElement('div');
  movieElement.classList.add('movieCol');

  movieElement.innerHTML = `
    
      <div style="background-image: url('${img_path + poster_path}'); background-size: cover; height: 250px; width: 100px"></div>
        <div>
          <h3>${title}</h3>
            <span>${new Date(release_date).getFullYear()}</span> 
            <span class="pipe">|</span> 
            <span class="${getClassByRate(vote_average).class}">
              ${vote_average} <i class="${getClassByRate(vote_average).star}"></i></span>
            <span class="pipe">|</span> 
            <span>${getGenres(genre_ids)}</span>
        </div>
        
        <p>${overview}</p>
      </div>
    </div>
  `

  // Attach button to an element for movie details 
  movieCol.appendChild(movieElement);
  movieElement.addEventListener('click', function() {
    fetchMovie(id);
  });
}