import API_BASE_URL from "./apiConfig.js";
import { handleApiError } from "../../exception/apiException.js";

const BOOKING_URL = `${API_BASE_URL}/bookings`;

export async function createBooking(booking) {
    try {
        const response = await axios.post(BOOKING_URL, booking);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

export async function getBookings() {
    try {
        const response = await axios.get(BOOKING_URL);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

export async function cancelBooking(id, booking) {
    try {
        const response = await axios.put(`${BOOKING_URL}/${id}`, {
            ...booking,
            status: "Cancelled"
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}
