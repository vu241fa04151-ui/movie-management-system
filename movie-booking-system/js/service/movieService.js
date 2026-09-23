import API_BASE_URL from "./apiConfig.js";
import { handleApiError } from "../../exception/apiException.js";

const MOVIE_URL = `${API_BASE_URL}/movies`;

export async function getMovies() {
    try {
        const response = await axios.get(MOVIE_URL);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

export async function getMovieById(id) {
    try {
        const response = await axios.get(`${MOVIE_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}

export async function updateMovie(id, movie) {
    try {
        const response = await axios.put(`${MOVIE_URL}/${id}`, movie);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}
