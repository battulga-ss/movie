import axios from "axios"
import type { Movie, MoviesResponse } from "@/types/movie"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
})

export interface GetMoviesParams {
  page?: number
  limit?: number
  search?: string
  genre?: string
}

export const getMovies = async (params: GetMoviesParams = {}): Promise<MoviesResponse> => {
  const { data } = await api.get<MoviesResponse>("/movies", { params })
  return data
}

export const getMovie = async (id: string): Promise<Movie> => {
  const { data } = await api.get<Movie>(`/movies/${id}`)
  return data
}

export default api
