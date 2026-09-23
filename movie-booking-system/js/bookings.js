import { getBookings, cancelBooking } from "./service/bookingService.js";

const bookingContainer = document.getElementById("bookingContainer");

async function loadBookings() {
    try {
        const bookings = await getBookings();
        renderBookings(bookings);
    } catch (_) {
        bookingContainer.innerHTML = "<p class='message'>Could not load booking history.</p>";
    }
}

function renderBookings(bookings) {
    bookingContainer.innerHTML = "";

    if (bookings.length === 0) {
        bookingContainer.innerHTML = "<p class='message'>No bookings found.</p>";
        return;
    }

    bookings.forEach((booking) => {
        const card = document.createElement("article");
        card.className = "booking-card";

        card.innerHTML = `
            <h3>${booking.movieTitle}</h3>
            <p><strong>Name:</strong> ${booking.userId}</p>
            <p><strong>Show:</strong> ${booking.showTime}</p>
            <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
            <p><strong>Total:</strong> ₹${booking.totalAmount}</p>
            <p><strong>Status:</strong> <span class="status">${booking.status}</span></p>
            ${booking.status !== "Cancelled" ? `<button class="cancel-btn" data-id="${booking.id}">Cancel Booking</button>` : ""}
        `;

        bookingContainer.appendChild(card);

        const cancelBtn = card.querySelector(".cancel-btn");
        if (cancelBtn) {
            cancelBtn.addEventListener("click", async () => {
                await cancelBooking(booking.id, booking);
                loadBookings();
            });
        }
    });
}

loadBookings();
