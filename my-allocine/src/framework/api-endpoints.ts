const BACKEND_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  FILMS: "https://api.themoviedb.org/3/discover/movie?language=en-US",
  FILM_GENRES: "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
  LOGIN: `${BACKEND_URL}/login`,
  PROFILE: `${BACKEND_URL}/profile`,
  FILM_DETAIL: (id: string) => `https://api.themoviedb.org/3/movie/${id}`,
};
