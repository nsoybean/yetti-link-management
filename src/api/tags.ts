import api from "@/configs/api";

export async function getAllTags(
  page = 1,
  limit = 50,
): Promise<{ total_records: number; data: string[] }> {
  const result = await api.get(`bookmark/archive?page=${page}&limit=${limit}`);
  return result.data;
}
