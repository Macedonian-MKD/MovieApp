const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("main");
getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const element = document.createElement("div");
    element.classList.add("movie");
    element.innerHTML = `
        <img src="${IMG_PATH}${movie.poster_path}"/>
        <div class="movie-info">
          <h3>${movie.original_title}</h3>
          <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
         ${movie.overview}
        </div>`;
    main.appendChild(element);
  });
}

function getClassByRate(rating) {
  if (rating > 5 && rating < 8) {
    return "orange";
  } else if (rating >= 8) {
    return "green";
  } else {
    return "red";
  }
}
