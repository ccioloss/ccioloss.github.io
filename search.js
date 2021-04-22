const searchMovieField = document.getElementById("movie-search");
const movieBox = document.querySelector(".movie-box");
const movieContainer = document.querySelector(".movie-container");
const movieImageBox = document.querySelector(".movie-image");
const searchField = document.getElementById("search");
const searchList = document.getElementById("search-list");

searchField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchValue = searchField.value;
    searchField.value = "";

    makeMultiRequest(searchValue).then((obj) => {
      const searchObj = obj.results[0];
      if (searchObj.media_type === "tv") {
        const processedTVSeries = processTVSeries(searchObj);
        searchList.innerHTML = "";
        let genreNames = [];
        searchObj.genre_ids.forEach((obj) => {
          if (genreIdsAndNames[obj] !== undefined) {
            genreNames.push(genreIdsAndNames[obj].name);
          }
        });
        processedTVSeries.forEach((tvseries) => {
          searchList.innerHTML += `<div class="card">
            <img src=${getFullImagePath(tvseries.imagePath)}>
            <h4>${tvseries.title}</h4>
            <p>${getListOfGenres(genreNames)}</p>
            <p id=${movieTypeByScore(tvseries.score)}>${tvseries.score}</p>
            <p id="movie-description">${tvseries.description}</p>
            <p id="release-year">${tvseries.firstAirDate}</p>
          </div>`;
        });
      } else if (searchObj.media_type === "movie") {
        const processedMovies = processMovies(searchObj);
        let genreNames = [];
        searchObj.genre_ids.forEach((obj) => {
          if (genreIdsAndNames[obj] !== undefined) {
            genreNames.push(genreIdsAndNames[obj].name);
          }
        });

        searchList.innerHTML = "";
        processedMovies.forEach((movie) => {
          searchList.innerHTML += `<div class="card">
            <img src=${getFullImagePath(movie.imagePath)}>
            <h4>${movie.title}</h4>
            <p>${getListOfGenres(genreNames)}</p>
            <p id=${movieTypeByScore(movie.score)}>${movie.score}</p>
            <p id="movie-description">${movie.description}</p>
            <p id="release-year">${movie.release_date}</p>
          </div>`;
        });
      } else {
        const processedActors = processActors(searchObj);
        searchList.innerHTML = "";
        processedActors.forEach((actor) => {
          searchList.innerHTML += `<div class="card">
            <img src=${getFullImagePath(actor.imagePath)}>
            <h4>${actor.name}</h4>
            <p id="actor-known-for-category">${actor.knownForCategory}</p>
            <p id="movie-description">${actor.knownFor}</p>
          </div>`;
        });
      }
    });
  }
});
