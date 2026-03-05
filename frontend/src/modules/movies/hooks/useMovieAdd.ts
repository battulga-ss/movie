import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type MovieInput = {
  title: string;
  year: number;
  genre: string[];
};

export const useMovieAdd = () => {
  return useMutation({
    mutationFn: async (data: MovieInput) => {
      const res = await axios.post(
        "http://localhost:3000/api/movies/create-movie",
        data
      );
      return res.data;
    },
  });
};