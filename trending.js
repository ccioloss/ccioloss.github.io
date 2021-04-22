const moviesBtn = document.getElementById("trending-movies");
const tvseriesBtn = document.getElementById("trending-tvseries");
const actorsBtn = document.getElementById("trending-actors");
const cardList = document.querySelector(".card-list");

// const makeMultiRequest = async (movieData) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${movieData}`
//   );
//   const jsonResponse = await response.json();
//   return jsonResponse;
// };

// const makeRequest = async (mediaType) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${api_key}`
//   );
//   const jsonResponse = await response.json();
//   return jsonResponse;
// };

// const getFullImagePath = (imagePath) => {
//   return `https://image.tmdb.org/t/p/w500${imagePath}`;
// };

// const movieTypeByScore = (score) => {
//   if (score >= 8.0) return `film-score-best`;
//   if (score >= 5.5) return `film-score-good`;
//   return `film-score-bad`;
// };

const processMovies = (objects) => {
  let movies = [];
  objects.results.forEach((obj) => {
    const movie = {
      title: obj.title,
      score: obj.vote_average,
      description: obj.overview,
      release_date: obj.release_date,
      imagePath: obj.backdrop_path,
      genre_ids: obj.genre_ids,
    };
    movies.push(movie);
  });

  return movies;
};

const processTVSeries = (objects) => {
  let tvseriesCollection = [];
  objects.results.forEach((obj) => {
    const tvseries = {
      title: obj.name,
      score: obj.vote_average,
      description: obj.overview,
      firstAirDate: obj.first_air_date,
      imagePath: obj.backdrop_path,
      genre_ids: obj.genre_ids,
    };
    tvseriesCollection.push(tvseries);
  });

  return tvseriesCollection;
};

const processActors = (objects) => {
  let actors = [];
  objects.results.forEach((obj) => {
    const actor = {
      name: obj.name,
      knownForCategory: obj.known_for_department,
      imagePath: obj.profile_path,
      knownFor: obj.known_for.map((movie) =>
        movie.media_type === "tv" ? movie.original_name : movie.title
      ),
    };

    actors.push(actor);
  });

  return actors;
};

moviesBtn.addEventListener("click", () => {
  makeRequest("movie").then((movies) => {
    const processedMovies = processMovies(movies);
    cardList.innerHTML = "";
    processedMovies.forEach((movie) => {
      let genreNames = [];
      movie.genre_ids.forEach((m) => {
        if (genreIdsAndNames[m] !== undefined) {
          genreNames.push(genreIdsAndNames[m].name);
        }
      });
      cardList.innerHTML += `<div class="card">
        <img src=${getFullImagePath(movie.imagePath)}>
        <h4>${movie.title}</h4>
        <p id="genre-id">${getListOfGenres(genreNames)}</p>
        <p id=${movieTypeByScore(movie.score)}>${movie.score}</p>
        <p id="movie-description">${movie.description}</p>
        <p id="release-year">${movie.release_date}</p>
      </div>`;
    });
  });
});

tvseriesBtn.addEventListener("click", () => {
  makeRequest("tv").then((tvseries) => {
    const processedTVSeries = processTVSeries(tvseries);
    cardList.innerHTML = "";
    processedTVSeries.forEach((tvseries) => {
      let genreNames = [];
      tvseries.genre_ids.forEach((m) => {
        if (genreIdsAndNames[m] !== undefined) {
          genreNames.push(genreIdsAndNames[m].name);
        }
      });
      cardList.innerHTML += `<div class="card">
        <img src=${getFullImagePath(tvseries.imagePath)}>
        <h4>${tvseries.title}</h4>
        <p id="genre-id">${getListOfGenres(genreNames)}</p>
        <p id=${movieTypeByScore(tvseries.score)}>${tvseries.score}</p>
        <p id="movie-description">${tvseries.description}</p>
        <p id="release-year">${tvseries.firstAirDate}</p>
      </div>`;
    });
  });
});

actorsBtn.addEventListener("click", () => {
  makeRequest("person").then((actors) => {
    processedActors = processActors(actors);
    cardList.innerHTML = "";
    processedActors.forEach((actor) => {
      cardList.innerHTML += `<div class="card">
        <img src=${getFullImagePath(actor.imagePath)}>
        <h4>${actor.name}</h4>
        <p id="actor-known-for-category">${actor.knownForCategory}</p>
        <p id="movie-description">${actor.knownFor}</p>
      </div>`;
    });
  });
});
