import { getMovieById } from "./service/movieService.js";
import { createBooking } from "./service/bookingService.js";
import { validateBooking, handleValidationError } from "../exception/validationException.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const movieSummary = document.getElementById("movieSummary");
const seatsContainer = document.getElementById("seatsContainer");
const totalAmount = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");

let movie = null;
let selectedSeats = [];

function renderSeats() {
    seatsContainer.innerHTML = "";
    const rows = ["A", "B", "C", "D", "E"];

    rows.forEach((row) => {
        for (let i = 1; i <= 8; i++) {
            const seat = `${row}${i}`;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "seat";
            button.textContent = seat;

            button.addEventListener("click", () => {
                if (selectedSeats.includes(seat)) {
                    selectedSeats = selectedSeats.filter((item) => item !== seat);
                    button.classList.remove("selected");
                } else {
                    selectedSeats.push(seat);
                    button.classList.add("selected");
                }

                updateTotal();
            });

            seatsContainer.appendChild(button);
        }
    });
}

function updateTotal() {
    const total = movie ? selectedSeats.length * movie.price : 0;
    totalAmount.textContent = `₹${total}`;
}

async function loadBookingPage() {
    if (!movieId) {
        movieSummary.innerHTML = "<p class='message'>Movie ID is missing.</p>";
        return;
    }

    try {
        movie = await getMovieById(movieId);
        movieSummary.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.genre} • ${movie.language}</p>
            <p>Ticket price: ₹${movie.price}</p>
        `;
        renderSeats();
        updateTotal();
    } catch (_) {
        movieSummary.innerHTML = "<p class='message'>Could not load movie.</p>";
    }
}

bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const showTime = document.getElementById("showTime").value;

    try {
        validateBooking({ customerName, selectedSeats });

        const booking = {
            userId: customerName,
            eventId: movie.id,
            movieTitle: movie.title,
            showTime,
            seats: selectedSeats,
            numberOfSeats: selectedSeats.length,
            totalAmount: selectedSeats.length * movie.price,
            bookingDate: new Date().toISOString(),
            status: "Booked"
        };

        await createBooking(booking);
        alert("Tickets booked successfully!");
        window.location.href = "bookings.html";
    } catch (error) {
        if (error && error.message) {
            handleValidationError(error);
        }
    }
});

loadBookingPage();
