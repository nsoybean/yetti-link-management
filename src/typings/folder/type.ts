export interface Folder {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  parentFolderId: string;
}

export interface IParentFolderHierarchy {
  _id: string;
  name: string;
  parentFolderId: IParentFolderHierarchy;
}
