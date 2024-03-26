import api from "@/configs/api";
import { Article } from "../typings/article/Article";

export async function addArticle({ link }: { link: string }): Promise<{
  id: string;
  link: string;
  domain: string;
  color: string;
  title: string;
  image: string;
  state: string;
  description: string;
  createdAt: Date;
}> {
  const result = await api.post(`bookmark/v3`, { link });
  return result.data;
}

export async function getAllArticles(
  page = 1,
  limit = 9,
): Promise<{ total_records: number; data: Article[] }> {
  let result = await api.get(`bookmark/?page=${page}&limit=${limit}`);
  return result.data;
}

export async function getAllArchivedArticles(
  page = 1,
  limit = 9,
): Promise<{ total_records: number; data: Article[] }> {
  const result = await api.get(`bookmark/archive?page=${page}&limit=${limit}`);
  // wait 3s
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return result.data;
}

export async function archiveArticle({ id }: { id: string }): Promise<{
  id: string;
  link: string;
  domain: string;
  color: string;
  title: string;
  image: string;
  state: string;
  description: string;
  createdAt: Date;
}> {
  const result = await api.patch(`bookmark/${id}/archive`);
  return result.data;
}
export async function unarchiveArticle({ id }: { id: string }): Promise<{
  id: string;
  link: string;
  domain: string;
  color: string;
  title: string;
  image: string;
  state: string;
  description: string;
  createdAt: Date;
}> {
  const result = await api.patch(`bookmark/${id}/unarchive`);
  return result.data;
}

export async function deleteArticle({ id }: { id: string }): Promise<{
  id: string;
  link: string;
  domain: string;
  color: string;
  title: string;
  image: string;
  state: string;
  description: string;
  createdAt: Date;
}> {
  const result = await api.delete(`bookmark/${id}`);
  return result.data;
}
