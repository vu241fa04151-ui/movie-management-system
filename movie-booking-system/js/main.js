import { getMovies } from "./service/movieService.js";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortRating = document.getElementById("sortRating");

let movies = [];

async function loadMovies() {
    try {
        movies = await getMovies();
        renderMovies(movies);
    } catch (_) {
        movieContainer.innerHTML = "<p class='message'>Could not load movies.</p>";
    }
}

function renderMovies(list) {
    movieContainer.innerHTML = "";

    if (list.length === 0) {
        movieContainer.innerHTML = "<p class='message'>No movies found.</p>";
        return;
    }

    list.forEach((movie) => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre} • ${movie.language}</p>
                <p>⭐ ${movie.rating} • ${movie.duration}</p>
                <p>₹${movie.price} per seat</p>
                <a class="button" href="movie-details.html?id=${movie.id}">View Details</a>
            </div>
        `;
        movieContainer.appendChild(card);
    });
}

function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const genre = genreFilter.value;

    let result = movies.filter((movie) => {
        const searchMatch = movie.title.toLowerCase().includes(query);
        const genreMatch = genre === "all" || movie.genre === genre;
        return searchMatch && genreMatch;
    });

    if (sortRating.value === "high") {
        result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortRating.value === "low") {
        result = [...result].sort((a, b) => a.rating - b.rating);
    }

    renderMovies(result);
}

searchInput.addEventListener("input", applyFilters);
genreFilter.addEventListener("change", applyFilters);
sortRating.addEventListener("change", applyFilters);

loadMovies();
