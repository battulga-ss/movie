import { useQuery } from "@tanstack/react-query";
import { getMovie } from "@/services/api";

export const useMovie = (id: string) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    enabled: !!id
  });
