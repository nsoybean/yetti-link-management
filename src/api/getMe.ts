import api from "@/configs/api";
import { User } from "../typings/user/User";

export async function getMe(): Promise<User> {
  const result = await api.get(`user/me`);
  return result?.data;
}
