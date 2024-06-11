import api from "@/configs/api";

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
