import { removeLocalUserData } from "@/configs/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();

  async function logout() {
    // storage
    removeLocalUserData();

    // clear cache

    console.log("🚀 ~ logout ~ clearing cache:");
    queryClient.removeQueries({ queryKey: ["getMe"] });

    // redirect
    window.location.href = "/";
  }

  return { logout };
}
