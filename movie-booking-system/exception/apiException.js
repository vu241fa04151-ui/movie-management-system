export function handleApiError(error) {
    console.error("API Error:", error);

    if (error.response) {
        alert(`Server error: ${error.response.status}`);
    } else if (error.request) {
        alert("Unable to connect to JSON Server. Make sure it is running on port 3000.");
    } else {
        alert("Something went wrong while processing the request.");
    }
}
