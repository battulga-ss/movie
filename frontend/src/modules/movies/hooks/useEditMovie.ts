import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type MovieInput = {
  title: string;
  year: number;
  genre: string[];
  runtime: number;
  director: string[];
  cast: string[];
  plot: string;
  poster?: string;
};

export const useEditMovie = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MovieInput }) => {
      const res = await axios.put(
        `http://localhost:3000/api/movies/edit-movie/${id}`,
        data,
      );
      return res.data;
    },
  });
};
