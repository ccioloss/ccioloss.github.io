const api_key = "8ad8864e6b28addab28a4b59df5c9676";

const genreIdsAndNames = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
];

const makeMultiRequest = async (movieData) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${movieData}`
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};

const makeRequest = async (mediaType) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${api_key}`
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};

const getFullImagePath = (imagePath) => {
  return `https://image.tmdb.org/t/p/w500${imagePath}`;
};

const movieTypeByScore = (score) => {
  if (score >= 8.0) return `film-score-best`;
  if (score >= 5.5) return `film-score-good`;
  return `film-score-bad`;
};

const processMovies = (obj) => {
  let movies = [];
  const movie = {
    title: obj.title,
    score: obj.vote_average,
    description: obj.overview,
    release_date: obj.release_date,
    imagePath: obj.backdrop_path,
  };
  movies.push(movie);

  return movies;
};

const processTVSeries = (obj) => {
  let tvseriesCollection = [];
  const tvseries = {
    title: obj.name,
    score: obj.vote_average,
    description: obj.overview,
    firstAirDate: obj.first_air_date,
    imagePath: obj.backdrop_path,
  };
  tvseriesCollection.push(tvseries);

  return tvseriesCollection;
};

const processActors = (obj) => {
  let actors = [];
  const actor = {
    name: obj.name,
    knownForCategory: obj.known_for_department,
    imagePath: obj.profile_path,
    knownFor: obj.known_for.map((movie) =>
      movie.media_type === "tv" ? movie.original_name : movie.title
    ),
  };

  actors.push(actor);

  return actors;
};

const getListOfGenres = (genres) => {
  let s = ``;
  for (let i = 0; i < genres.length; i++) {
    s += genres[i];
    if (i < genres.length - 1) s += `, `;
  }

  return s;
};

const isListOfGenresEmpty = (genres) => {
  if (genres.length != 0) return false;
  return true;
};
