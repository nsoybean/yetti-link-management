import { useContext, useEffect, useState } from "react";
import { MdSort } from "react-icons/md";
import {
  Flex,
  Text,
  Box,
  Divider,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import Pagination from "../../components/Pagination";
import { Layout } from "../../components/Layout";
import { CardTiles } from "../../components/CardTiles";
import { GenericResponseBookmark } from "../../types/saves";
import BookmarkAPI from "../../api/BookmarkAPI";
import { AuthContext } from "../../api/context/authContext";
import { BookmarkChangeContext } from "../../api/context/bookmarkChangeContext";
import blankSlateContent from "../../Assets/blankSlateContent.svg";
import InputSave from "../../components/common/Form/InputSave";

function SavePage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12); // default 12 doc per page
  const [bookmarkData, setBookmarkData] = useState<GenericResponseBookmark>();
  const { authToken } = useContext(AuthContext);
  const { bookmarkChange } = useContext(BookmarkChangeContext);

  // fetch data on first render
  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ["getAllBookmark", page, pageSize, bookmarkChange],
    queryFn: (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllBookmark(
        page + 1, // library is 0-index, API is 1-index
        pageSize,
        authToken.accessToken ?? ""
      );
    },
    retry: false,
  });

  useEffect(() => {
    if (fetchedData) {
      setBookmarkData(fetchedData);
    }
  }, [fetchedData]);

  return (
    <Layout>
      <Box
        maxH="80%"
        mx="auto"
        maxWidth={{
          base: "100%",
          "2xl": "80%",
        }}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text textStyle="headerBold" color="brand.main">
            Articles ({bookmarkData?.total_records || 0})
          </Text>
          {/* temp commented out till functionality is implemented */}
          {/* <Box>
            <Menu>
              <MenuButton
                as={Button}
                fontWeight='bold'
                sx={{ borderRadius: '8px' }}
                aria-label='sort articles'
                rightIcon={<MdSort />}
              >
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem>By date</MenuItem>
              </MenuList>
            </Menu>
          </Box> */}
        </Flex>

        <Divider my={2} mx="auto" />

        {/* search bar here  */}

        {/* main card tiles */}
        {/*  show tiles when API is loading, or when records exist */}
        {isLoading || (bookmarkData && bookmarkData.total_records > 0) ? (
          <CardTiles pages={bookmarkData?.data} isLoading={isLoading} />
        ) : (
          // show 'blank' illustration when useQuery has settled and there are no records
          <VStack justifyContent={"center"} alignItems={"center"}>
            <Image
              mt={"10"}
              height="30vh"
              width="45vh"
              objectFit="contain"
              src={blankSlateContent}
              alt={"image-depict-blank-slate"}
              borderRadius="lg"
            />
            <Text
              mt={"3"}
              fontFamily="sans-serif"
              fontWeight={"semibold"}
              fontSize={"lg"}
            >
              {"Let's Start! Add Your First URL!"}
            </Text>
            <InputSave setShowUrlInput={() => {}} />
          </VStack>
        )}

        {/* pagination at footer */}
        {/* when useQuery has settled and records exist */}
        {!isLoading && bookmarkData && bookmarkData?.total_records > 0 && (
          <Flex justifyContent={"center"}>
            <Pagination
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              count={bookmarkData?.total_records || 0}
            />
          </Flex>
        )}
      </Box>
    </Layout>
  );
}

export default SavePage;
