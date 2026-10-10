import axios from "axios";
const API_URL = 'http://localhost:8080/movies';

export async function saveMovie(movie) {
    return await axios.post(API_URL,movie)
    
}
export async function  getMovie(page = 0 , size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
    
}
export async function getMovieById(movieId)
{
     //alt + 96
    return axios.get(`${API_URL}/${movieId}`)
}
export async function updateMovie(movie)
{
    return axios.put(`${API_URL}/${movie.movieId}`,movie);
}
export async function deleteMovieById(movieId)
{
    return axios.delete(`${API_URL}/${movieId}`)
}