import api from "@/configs/api";
import { Article } from "../typings/article/type";
import { ISearchArticle } from "@/typings/search/articles";
import { Folder } from "@/typings/folder/type";

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
  query?: string,
): Promise<{ total_records: number; data: Article[] }> {
  let url = `bookmark?page=${page}&limit=${limit}`;
  if (query) {
    url += `&tag=${query}`;
  }
  let result = await api.get(url);
  return result.data;
}

export async function getAllSaves({
  folderId,
  page = 1,
  limit = 9,
  query,
}: {
  folderId: string | null;
  page: number;
  limit: number;
  query?: string;
}): Promise<{
  folders: {
    data: Folder[];
  };
  bookmarks: {
    total_records: number;
    data: Article[];
  };
}> {
  console.log("🚀 ~ folderId:", folderId);
  let url = "saves";

  // if specific folder
  if (folderId) {
    url += `/folder/${folderId}`;
  }

  // else home
  url = `${url}?page=${page}&limit=${limit}`;

  if (query) {
    url += `&tag=${query}`;
  }

  let result = await api.get(url);
  return result.data;
}

export async function getAllArchivedArticles(
  page = 1,
  limit = 9,
): Promise<{ total_records: number; data: Article[] }> {
  const result = await api.get(`bookmark/archive?page=${page}&limit=${limit}`);
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

export async function tagArticle({
  id,
  tags,
}: {
  id: string;
  tags: string[];
}): Promise<{
  id: string;
}> {
  const result = await api.patch(`bookmark/${id}/tags`, { tags });
  return result.data;
}

export async function updateArticleMetaById({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<{
  id: string;
}> {
  const result = await api.patch(`bookmark/${id}/metadata`, { title });
  return result.data;
}

export async function search({
  term,
}: {
  term: string;
}): Promise<ISearchArticle[]> {
  const result = await api.get(`bookmark/search?query=${term}`);
  return result.data;
}
