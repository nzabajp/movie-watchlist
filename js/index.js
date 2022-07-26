const searchField = document.getElementById("search-field")
const searchBtn = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")
const initialImage = document.getElementById("initial-image")

const url = `http://www.omdbapi.com/?apikey=285af6b1`
const title = `&t=`
let searchResultList = []

//initialize localStorage "watchlist" key
let local = localStorage.getItem("watchlist")
if(!local) {
    localStorage.setItem("watchlist", "")
}


searchBtn.addEventListener("click", getListOfNames)
searchField.addEventListener("click", () => searchField.select())

//uses fetch to GET list of movies from the search input
function getListOfNames() {
    console.log(searchField.value)

    movieContainer.innerHTML = ""
    movieContainer.classList.remove("initial-data")
    initialImage.style.display = "none"

    fetch(`${url}&s=${searchField.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "True") {
                const listOfNames = (data.Search).map(movie => movie.Title)
                getFullDetails(listOfNames, title)
            } else {
                renderError()
            }
        })
}

//gets list of names array, maps through it and gets full details of the movies
function getFullDetails(arr, parameter) {
    console.log(arr)
    arr.map(name => {
        if(name) {
            fetch(`${url}${parameter}${name}`)
                .then(res => res.json())
                .then(data => {
                    renderToDom(data)
                    console.log(searchResultList)
                })
        }
    })
}

// renders the full details of movies to the DOM
function renderToDom(data) {
    const {Poster, Title, imdbRating, imdbID, Runtime, Genre, Plot} = data

    movieContainer.innerHTML += `
    <section class="movie-card">
        <img src="${Poster}">
        <div class="movie-content">
            <div class="movie-title">
                <h3>${Title}</h3>
                <p>⭐ ${imdbRating}</p>
            </div>
            <div class="movie-info">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button type="button" id="${imdbID}" onclick="toggleWatchlist(this.id)">${onLocalStorage(imdbID)}</button>
            </div>
            <div class="movie-body">
                <p>${Plot}</p>
            </div>
        </div>
    </section>
    `
}

//checks if movie already added to local storage
function onLocalStorage(id) {
    let local = localStorage.getItem("watchlist").split(",")
    const isOnLocal = local.find(code => code === id)
    if(isOnLocal) {
        return "➖ Remove"
    } else {
        return "➕ Watchlist"
    }
}

//renders error message to DOM if no movies found from API
function renderError() {
    movieContainer.classList.add("initial-data")
    movieContainer.innerHTML = `<p class="error">Unable to find what you’re looking for. Please try another search.</p>`
}

export { getFullDetails, movieContainer }