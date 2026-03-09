import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export type MovieInput = {
  title: string;
  year: number;
  genres: string[]; // genre
  runtime: number;
  directors: string[]; // director
  cast: string[];
  plot: string;
  writers: string[];
  poster?: string;
  languages?: string[];
  countries?: string[];
  rated?: string;
  imdb?: {
    rating?: number;
    votes?: number;
  };
  awards?: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
};

export const useMovieAdd = () => {
  return useMutation({
    mutationFn: async (data: MovieInput) => {
      const res = await axios.post(
        "http://localhost:3000/api/movies/create-movie",
        data,
      );
      return res.data;
    },
  });
};
