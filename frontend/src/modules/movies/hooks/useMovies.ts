import { useQuery } from "@tanstack/react-query";
import { getMovies, type GetMoviesParams } from "@/services/api";

export const useMovies = (params: GetMoviesParams) =>
  useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params)
  });
