export function validateBooking({ customerName, selectedSeats }) {
    if (!customerName || customerName.trim().length < 2) {
        throw new Error("Please enter a valid customer name.");
    }

    if (!selectedSeats || selectedSeats.length === 0) {
        throw new Error("Please select at least one seat.");
    }

    return true;
}

export function handleValidationError(error) {
    alert(error.message);
}
