import { getMovieById, updateMovie } from "./service/movieService.js";

const detailsContainer = document.getElementById("movieDetails");
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function loadMovie() {
    if (!movieId) {
        detailsContainer.innerHTML = "<p class='message'>Movie ID is missing.</p>";
        return;
    }

    try {
        const movie = await getMovieById(movieId);

        detailsContainer.innerHTML = `
            <div class="details-card">
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="details-content">
                    <h2>${movie.title}</h2>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p><strong>Language:</strong> ${movie.language}</p>
                    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                    <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
                    <p><strong>Duration:</strong> ${movie.duration}</p>
                    <p><strong>Price:</strong> ₹${movie.price} per seat</p>
                    <p>${movie.description}</p>
                    <div class="action-row">
                        <button id="favouriteBtn">${movie.favourite ? "★ Favourite" : "☆ Add Favourite"}</button>
                        <a class="button" href="booking.html?id=${movie.id}">Book Tickets</a>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("favouriteBtn").addEventListener("click", async () => {
            const updated = { ...movie, favourite: !movie.favourite };
            await updateMovie(movie.id, updated);
            loadMovie();
        });
    } catch (_) {
        detailsContainer.innerHTML = "<p class='message'>Could not load movie details.</p>";
    }
}

loadMovie();
