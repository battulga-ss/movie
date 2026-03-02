import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/api";

export const useUser = (enabled: boolean) =>
  useQuery({
    queryKey: ["useUser"],
    queryFn: () => getUser(),
    enabled
  });
