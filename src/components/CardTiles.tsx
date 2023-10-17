import React from 'react'
import { CardTile } from './CardTile'
import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { IBookmark } from '../types/saves'

interface PagesProps {
  pages: IBookmark[] | undefined
  isLoading: boolean
}

export const CardTiles: React.FC<PagesProps> = ({
  pages,
  isLoading,
}: PagesProps) => {
  const generateSkeletonTiles = () => {
    const tiles = []
    for (let i = 0; i < 9; i++) {
      tiles.push(
        <GridItem colSpan={1} key={i}>
          <Skeleton sx={{ borderRadius: '8px' }} height='300px' width='300px' />
        </GridItem>,
      )
    }
    return tiles
  }

  const boilerCards = generateSkeletonTiles()

  return (
    <>
      <Grid
        gap={3}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
          '2xl': 'repeat(3, 1fr)',
        }}
        alignItems={'stretch'}
      >
        {!isLoading && pages
          ? pages.map((page) => (
              <GridItem colSpan={1} key={page.id}>
                <CardTile page={page} />
              </GridItem>
            ))
          : boilerCards}
      </Grid>
    </>
  )
}
