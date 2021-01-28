export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY=process.env.REACT_APP_MOVIE_API_KEY;
export const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY;
const MOVIES_API = "https://api.themoviedb.org/3/movie/";

export const getSimilarMoviesEndpoint = function(movie_id) {
    return MOVIES_API + movie_id + "/similar?api_key=" + API_KEY;
}