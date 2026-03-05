// frontend/src/api/movieApi.ts
import type { Movie, MoviesResponse } from "@/types/movie";

const BASE_URL = "http://localhost:3000/api";

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("auth-token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface GetMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export const getMovies = async (
  params: GetMoviesParams = {},
): Promise<MoviesResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.genre) query.set("genre", params.genre);

  const res = await fetch(`${BASE_URL}/movies?${query}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const getMovie = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/${id}`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const editMovie = async (
  id: string,
  data: Partial<Movie>,
): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/edit-movie${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update movie");
  return res.json();
};

export const getUser = async (): Promise<{ id: string }> => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const addMovie = async (data: Partial<Movie>) => {
  const res = await fetch(`${BASE_URL}/movies/create-movie`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create movie");
  return res.json();
};
