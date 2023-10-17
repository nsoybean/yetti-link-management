import { createContext } from 'react'
// context (global state) to determine if bookmark resource have changed, and refetch of API is required
export const BookmarkChangeContext = createContext<{
  bookmarkChange: boolean
  setBookmarkChange: React.Dispatch<React.SetStateAction<boolean>>
}>({
  bookmarkChange: true,
  setBookmarkChange: () => {},
})
