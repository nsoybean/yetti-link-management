export interface IPage {
  id: string
  title: string
  img?: {
    src: string
    alt?: string | undefined
  }
  lengthMin?: number
  link: string
}

export enum BookmarkStateEnum {
  AVAILABLE = 'AVAILABLE',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

export interface IBookmark {
  state: BookmarkStateEnum
  id: string
  link: string
  domain: string
  color: string
  image: string
  title: string
  createdAt?: string
  type?: string
  note?: string
  description?: string
  icon?: string
}
export interface GenericResponseBookmark {
  data: IBookmark[]
  total_records: number
}
