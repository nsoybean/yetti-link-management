export interface Folder {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  parentFolderId: string;
}
