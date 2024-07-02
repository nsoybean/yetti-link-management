import api from "@/configs/api";
import { Article } from "../typings/article/type";
import { ISearchArticle } from "@/typings/search/articles";
import {
  Folder as IFolder,
  IParentFolderHierarchy,
} from "@/typings/folder/type";

export async function addArticle({
  link,
  parentFolderId,
}: {
  link: string;
  parentFolderId: string;
}): Promise<{
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
  const result = await api.post(`bookmark/v3`, { link, parentFolderId });
  return result.data;
}

export async function getAllArticles({
  folderId,
  page = 1,
  limit = 9,
  tag = null,
}: {
  folderId: string | null;
  page: number;
  limit: number;
  tag?: string | null;
}): Promise<{
  folders: {
    total_records: number;
    data: IFolder[];
  };
  bookmarks: {
    total_records: number;
    data: Article[];
  };
  parentFolderHierarchy: {
    maxDepthLookupReached: boolean;
    list: { _id: string; name: string }[];
  };
}> {
  let baseUrl = `bookmark?page=${page}&limit=${limit}`;

  // if specific folder
  if (folderId) {
    baseUrl += `&folderId=${folderId}`;
  }

  // if specific tag
  if (tag) {
    baseUrl += `&tag=${tag}`;
  }

  let result = await api.get(baseUrl);
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

export async function moveBookmarksToFolder({
  bookmarkIds,
  folderId,
}: {
  bookmarkIds: string[];
  folderId: string;
}): Promise<{
  id: string;
}> {
  const result = await api.patch(`bookmark/move`, { bookmarkIds, folderId });
  return result.data;
}
