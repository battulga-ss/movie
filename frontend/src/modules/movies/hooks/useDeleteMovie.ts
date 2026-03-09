import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteMovie = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(
        `http://localhost:3000/api/movies/delete-movie/${id}`,
      );
      return res.data;
    },
  });
};
