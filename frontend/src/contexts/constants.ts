export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://sleepy-inlet-56101.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

export const API_BASE_URL = process.env.NODE_ENV !== 'production'
    ? "http://localhost:8080/auth/"
    : "https://video-sharing.onrender.com/auth";

export const API_BASE_URL_USERS = process.env.NODE_ENV !== 'production'
    ? "http://localhost:8080/api/users/"
    : "https://video-sharing.onrender.com/api/users";
