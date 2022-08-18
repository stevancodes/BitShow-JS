var searchButton = document.querySelector(".search-button");
var searchInput = document.querySelector("#search");

var gridMovies = document.querySelector(".grid-movies");

var container = document.querySelector(".container");

function fetchData() {
  gridMovies.innerHTML = "";
  fetch(`http://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => {
      createMovies(data);
    });
}

function createMovies(data) {
  var newArr = data
    .sort((a, b) => b.rating.average - a.rating.average)
    .filter((el, ind) => {
      return ind < 50;
    })
    .forEach((item) => {
      var movie = document.createElement("div");
      var movieName = document.createElement("h2");
      var movieImage = document.createElement("img");

      movie.classList = "movie";
      movieImage.setAttribute("src", item.image.original);
      movieName.innerHTML = item.name;
      movie.append(movieImage, movieName);
      gridMovies.append(movie);

      movie.addEventListener("click", function () {
        localStorage.setItem("id", item.id);
        window.location.href = "./showDetails.html";
      });
    });
}

function searchQueryData() {
  if (searchInput.value !== "") {
    container.style.display = "block";
    fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = "";
        data.forEach((el) => {
          // console.log(el);
          var movieTitle = document.createElement("h4");
          movieTitle.innerText = `${el.show.name}`;
          container.append(movieTitle);
          movieTitle.addEventListener("click", function () {
            localStorage.setItem("id", el.show.id);
            window.location.href = "./showDetails.html";
          });
        });
      });
  }
}

function createMoviesForBtnEvent(e) {
  if (searchInput.value != null && searchInput.value != "") {
    console.log(searchInput.value);
    gridMovies.innerHTML = "";
    container.style.display = "none";
    fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var newArr = data
          .sort((a, b) => b.show.rating.average - a.show.rating.average)
          .filter((el, ind) => {
            return ind < 50;
          })
          .forEach((item) => {
            var movie = document.createElement("div");
            var movieName = document.createElement("h2");
            var movieImage = document.createElement("img");

            movie.classList = "movie";
            movieImage.setAttribute("src", item.show.image.original);
            movieName.innerHTML = item.show.name;
            movie.append(movieImage, movieName);
            gridMovies.append(movie);

            movie.addEventListener("click", function () {
              localStorage.setItem("id", item.show.id);
              window.location.href = "./showDetails.html";
            });
          });
      });
    searchInput.value = "";
  }
  e.stopPropagation();
}

// const header = document.querySelector("header");
document.body.addEventListener("click", function (e) {
  container.style.display = "none";
  searchInput.value = "";
});
const homeTitle = document.querySelectorAll("h2")[0];
homeTitle.addEventListener("click", fetchData);
// document.body.addEventListener('click', function (e) {
//     container.style.display = "none"
//     e.stopPropagation();
// })
searchButton.addEventListener("click", createMoviesForBtnEvent);
fetchData();
