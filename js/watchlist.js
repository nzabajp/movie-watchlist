import { getFullDetails, movieContainer } from './index.js'

const movieIdParam = `&i=`
let local = localStorage.getItem("watchlist").split(",")
console.log(local)

if(local.length > 1) {
    movieContainer.innerHTML = ""
    movieContainer.classList.remove("initial-data")
    getFullDetails(local, movieIdParam)
    renameBtn(local)
}

function renameBtn(idArr) {
    idArr.map(id => {
        if(id) {
            const domEle = document.getElementById(id)
            console.log(domEle)
        }
    })
}