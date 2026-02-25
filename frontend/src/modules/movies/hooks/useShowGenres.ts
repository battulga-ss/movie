import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/services/api";
export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
