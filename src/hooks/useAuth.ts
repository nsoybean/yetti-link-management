import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/getMe";

export default function useAuth() {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
