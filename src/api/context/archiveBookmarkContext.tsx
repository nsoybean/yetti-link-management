import { createContext, useContext, useMemo, useState } from 'react'

import { GenericResponseBookmark, IBookmark } from '../../types/saves'
import { useQuery } from '@tanstack/react-query'
import BookmarkAPI from '../BookmarkAPI'
import { AuthContext } from './authContext'

interface BookmarkDataContextType {
  allData: IBookmark[] | undefined
  refetchArchiveBookmarkData: () => void
}

export const contextData = {
  allData: undefined,
  refetchArchiveBookmarkData: () => void {},
}

export const ArchiveBookmarkContext =
  createContext<BookmarkDataContextType>(contextData)

export const ArchiveBookmarkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { authToken } = useContext(AuthContext)
  const [page] = useState(1)
  const [limit] = useState(10)

  const { data: bookmarkData, refetch: refetchBookmarkData } = useQuery({
    queryKey: ['getAllArchivedBookmark'],
    queryFn: (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllArchivedBookmark(
        page,
        limit,
        authToken.accessToken ?? '',
      )
    },
    retry: false,
  })
  const bookmarkMemoisedData = useMemo(() => {
    return {
      allData: bookmarkData?.data,
      refetchArchiveBookmarkData: () => refetchBookmarkData(),
    }
  }, [bookmarkData?.data, refetchBookmarkData])

  return (
    <ArchiveBookmarkContext.Provider value={bookmarkMemoisedData}>
      {children}
    </ArchiveBookmarkContext.Provider>
  )
}
