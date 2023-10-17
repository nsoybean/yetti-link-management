import React, { memo, useContext } from 'react'

import { Stack } from '@chakra-ui/react'
import { Paginate } from 'react-paginate-chakra-ui'
import { BookmarkChangeContext } from '../api/context/bookmarkChangeContext'
// import 'focus-visible'
// import './styles.css'

interface IPaginationProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  count: number
}

function Pagination(props: IPaginationProps) {
  const { bookmarkChange, setBookmarkChange } = useContext(
    BookmarkChangeContext,
  )
  const handlePageClick = (p: number) => {
    // prevent re-render when same page is clicked
    if (p === props.page) {
      return
    }
    props.setPage(p)
    setBookmarkChange(!bookmarkChange)
  }

  return (
    <Stack p={5}>
      <Paginate
        // required props 👇
        page={props.page}
        count={props.count}
        pageSize={props.pageSize}
        onPageChange={handlePageClick}
        // optional props 👇
        margin={2}
        shadow='sm'
        variant='outline'
        border='1px solid'
        borderColor='gray.300'
        borderRadius={'10'}
        colorScheme='purple'
        color='black'
        maxWidth='10'
        _dark={{ color: 'white' }}
      />
    </Stack>
  )
}

export default memo(Pagination)
