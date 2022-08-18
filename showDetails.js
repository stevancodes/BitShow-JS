var id = localStorage.getItem("id");
var container = document.querySelector(".container");
var container2 = document.querySelector(".container2");
const leftWrapper = document.querySelector(".left-wrapper");
const rightWrapper = document.querySelector(".right-wrapper");
const heading = document.querySelector("h1");
let summary = document.querySelector(".summary");
let seasons = document.querySelector(".seasons");
let cast = document.querySelector(".cast");

var searchInput = document.querySelector("#search");
function getThatMovie() {
  fetch(`http://api.tvmaze.com/shows/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      heading.innerHTML = `${data.name}`;
      leftWrapper.innerHTML = `<img src="${data.image.original}"</img>`;
      summary.innerHTML = data.summary;
      //   const p = document.createElement("p");
      //   p.innerText = "helloo";
      //   container2.append(p);
    })
    .then(() => {
      getSeasons(id);
      getCast(id);
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
          movieTitle.addEventListener("click", function (e) {
            localStorage.setItem("id", el.show.id);
            window.location.href = "./showDetails.html";
            e.stopPropagation();
          });
        });
      });
  }
}

function getSeasons(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
    .then((res) => res.json())
    .then((data) => {
      let seasonsNum = document.createElement("h3");
      seasonsNum.innerText = ` Seasons (${data.length})`;
      seasons.append(seasonsNum);
      data.forEach(function (item) {
        // seasons.innerHTML = `Seasons (${data.length})`;
        let listItem = document.createElement("p");
        listItem.innerText = `${item.premiereDate} - ${item.endDate}`;
        seasons.append(listItem);
      });
    });
}

function getCast(id) {
  fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    .then((res) => res.json())
    .then((data) => {
      let castTitle = document.createElement("h3");
      castTitle.innerText = "Cast";
      cast.append(castTitle);
      let newData = data.filter((element, index) => index < 7);
      newData.forEach(function (item) {
        // seasons.innerHTML = `Seasons (${data.length})`;
        let listItem = document.createElement("p");
        listItem.innerText = `${item.person.name}`;
        cast.append(listItem);
      });
    });
}

document.body.addEventListener("click", function (e) {
  container.style.display = "none";
  searchInput.value = "";
});
const homeTitle = document.querySelectorAll("h2")[0];
homeTitle.addEventListener("click", function () {
  window.location.href = "./shows.html";
});
getThatMovie();
