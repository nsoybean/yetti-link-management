import { removeLocalUserData } from "@/configs/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();

  async function logout() {
    // storage
    removeLocalUserData();

    // clear cache
    queryClient.removeQueries({ queryKey: ["getMe"] });

    // redirect
    window.location.href = "/";
  }

  return { logout };
}
