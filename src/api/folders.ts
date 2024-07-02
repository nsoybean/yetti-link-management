import api from "@/configs/api";
import { Folder as IFolder } from "@/typings/folder/type";

export async function createFolder({
  parentFolderId,
  folderName,
}: {
  parentFolderId: "root" | string;
  folderName: string;
}): Promise<{
  id: string;
  createdAt: Date;
}> {
  const result = await api.post(`folder`, { parentFolderId, folderName });
  return result.data;
}

export async function updateFolderMetaById({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<{
  id: string;
}> {
  const result = await api.patch(`folder/${id}/metadata`, { name });
  return result.data;
}

export async function deleteFolderById({ id }: { id: string }): Promise<{
  id: string;
}> {
  const result = await api.delete(`folder/${id}`);
  return result.data;
}

export async function getNestedFoldersById({
  id,
}: {
  id: "root" | string;
}): Promise<{
  folders: {
    total_records: number;
    data: IFolder[];
  };
  parentFolderHierarchy: {
    maxDepthLookupReached: boolean;
    list: { _id: string; name: string }[];
  };
}> {
  const result = await api.get(`folder/folders?id=${id}`);
  return result.data;
}
