import { getFullDetails, movieContainer } from './index.js'

const movieIdParam = `&i=`
let local = localStorage.getItem("watchlist").split(",")

if(local.length > 1) {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove("initial-data")
    getFullDetails(local, movieIdParam)
}