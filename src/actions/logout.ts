import { removeLocalUserData } from "@/configs/auth";
import { useQueryClient } from "@tanstack/react-query";

export async function Logout() {
  // storage
  removeLocalUserData();

  // redirect
  window.location.href = "/";
}
