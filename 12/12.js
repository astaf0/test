const apiKey = 'd1f79378'
const searchForm = document.getElementById("searchForm")
const movieList = document.getElementById("movieList")
const pagination = document.getElementById("pagination")
const movieDetails = document.getElementById("movieDetails")


searchForm.addEventListener("submit", function(event) {
  event.preventDefault()
  const formData = new FormData(searchForm)
  searchMovies(formData, 1)
})


function searchMovies(formData, page) {
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${formData.get("s")}&type=${formData.get("type")}&page=${page}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.Search) {
      displayMovies(data.Search)
      displayPagination(data.totalResults, formData)

    } else {
      movieList.textContent = 'Movie not found!'
      pagination.innerHTML = ''
      movieDetails.style.display = 'none'
    }
    
  })
  .catch(error => {
    movieList.textContent = error
    pagination.innerHTML = ''
    movieDetails.style.display = 'none'
  })

}

function displayMovies(movies) {
  movieList.innerHTML = ''

  movies.forEach(movie => {
    
    const movieItem = document.createElement("div")
    movieItem.classList.add("movieItem")
    
    movieItem.innerHTML = ` <img src="${movie.Poster}" alt="">
                            <div class='about-movie'>
                                <p class='gray-text'>${movie.Type}</p>
                                <h4>${movie.Title}</h4>
                                <p class='gray-text'>${movie.Year}</p>
                                <button data-imdbid="${movie.imdbID}">Детали</button>
                            </div>`

    movieList.appendChild(movieItem)


    movieItem.querySelector("button").addEventListener("click", function() {
      const imdbID = this.dataset.imdbid
      getMovieDetails(imdbID)
    })
  })
  movieDetails.style.display = 'none'
}



function displayPagination(totalResults, formData) {
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalResults / itemsPerPage)

  pagination.innerHTML = ''

  for (let i = 1; i <= totalPages; i++) {

    const pageButton = document.createElement("button")
    pageButton.textContent = i
    pageButton.addEventListener("click", () => {

      searchMovies(formData, i)
    })
    pagination.appendChild(pageButton)
  }
}



function getMovieDetails(imdbID) {
  movieDetails.style.display = 'flex'

  const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`

  fetch(url)
  .then(response => response.json())
  .then(data => {
    movieDetails.insertAdjacentHTML('beforeend', `
                          <div class='details-div'>
                          <img src="${data.Poster}" alt="">
                          <div>
                              <p><strong>Title:</strong> ${data.Title}</p>
                              <p><strong>Released:</strong> ${data.Released}</p>
                              <p><strong>Genre:</strong> ${data.Genre}</p>
                              <p><strong>Country:</strong> ${data.Country}</p>
                              <p><strong>Director:</strong> ${data.Director}</p>
                              <p><strong>Writer:</strong> ${data.Writer}</p>
                              <p><strong>Actors:</strong> ${data.Actors}</p>
                              <p><strong>Awards:</strong> ${data.Awards}</p>
                          </div>
                          </div>`)
  })
  .catch(error => {
    movieDetails.textContent = error
  })
}