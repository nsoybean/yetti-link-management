import { Tag } from "../tag/Tag";

export interface Article {
  _id: string;
  link: string;
  description: string;
  state: string;
  note: string;
  color: string;
  image: string;
  title: string;
  domain: string;
  updatedAt: Date;
  createdAt: Date;
  tags: Tag[];
}

export enum ArticleStateEnum {
  AVAILABLE = "AVAILABLE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}
