import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
  Stack,
  Heading,
  Button,
  Flex,
  Center,
  AspectRatio,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image, VStack, Text, Box, Link } from "@chakra-ui/react";
import { BookmarkStateEnum, IBookmark } from "../types/saves";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineFolderOpen,
  AiOutlineUndo,
  AiOutlineForm,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import DeleteModal from "./views/saves/DeleteModal";
import ArchiveModal from "./views/saves/ArchiveModal";
import BookmarkAPI from "../api/BookmarkAPI";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../api/context/authContext";
import toast from "react-hot-toast";
import { BookmarkChangeContext } from "../api/context/bookmarkChangeContext";
import { formatAMPM } from "../helpers/utils";

interface PageProps {
  page: IBookmark;
}

// this component is being used in both 'save' and 'archive' page
export const EditorCardPreview: React.FC<PageProps> = ({ page }: PageProps) => {
  const isDesktop = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  });

  // note: 'md' is the breakpoint beyond which card direction becomes row (vertically stacked)
  return (
    <>
      {/* Main component */}
      <Card
        variant="custom"
        maxWidth={{
          base: "75%",
          sm: "75%",
          md: "90%",
          lg: "75%",
          xl: "75%",
        }}
        // maxHeight={"200px"}
        maxHeight={{
          base: "350px",
          md: "200px",
        }}
        mx="auto"
        my={"2"}
        direction={{ base: "column", md: "row" }}
      >
        {/* bookmark image preview */}
        <Box
          position="relative"
          borderRadius="md"
          overflow="hidden"
          w={{
            base: "100%",
            md: "35%",
          }}
        >
          <Link
            sx={{
              textDecoration: "none",
              _hover: "none",
              _focus: "none",
              _active: "none",
              _visited: "none",
            }}
            href={`${page.link}`}
            isExternal
          >
            {/* image */}
            {page.image ? (
              <Image
                height="100%" // stretch image vertically to fit
                width="100%" // stretch image horizontally to fit
                objectFit="cover"
                src={page.image}
                alt={"boilerplate-image"}
                borderRadius="lg"
              />
            ) : (
              <Box
                bg={page.color ? page.color : "#bd88f7"}
                // w='100%'
                // h='18vh'
                height="100%" // stretch image vertically to fit
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
                color="white"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize={{
                  base: "50",
                  lg: "100",
                }}
                textTransform="uppercase"
              >
                {page?.domain?.charAt(0) || "P"}
              </Box>
            )}
            {/* grey shade over image */}
            <HStack
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.7)"
              opacity="0"
              transition="opacity 0.3s ease"
              borderRadius="md"
              _hover={{ opacity: 1 }}
              color="white"
              alignItems="center"
              justifyContent="center"
              textStyle={"body1Semi"}
            >
              <Wrap justify="center">
                <WrapItem>
                  <Text textAlign="center" fontSize="xl">
                    View article
                  </Text>
                </WrapItem>
                <WrapItem alignSelf={"center"}>
                  <FiExternalLink size={20} />
                </WrapItem>
              </Wrap>
            </HStack>
          </Link>
        </Box>

        {/* bookmark data/ metadata */}
        <CardBody>
          <VStack p="2" align="start" w={"100%"}>
            {/* title */}
            <Text
              as="b"
              overflowWrap={"anywhere"}
              noOfLines={1}
              fontSize={"lg"}
            >
              {page.title}
            </Text>
            {/* description */}
            <Text
              overflowWrap={"anywhere"}
              noOfLines={2}
              textColor="blackAlpha.700"
              _dark={{
                textColor: "whiteAlpha.800",
              }}
            >
              {page.description || ""}
            </Text>
            {/* link */}
            <Flex alignItems={"center"}>
              {page.icon && (
                <Center w="25px" h="25px" mr={"2"}>
                  <Image objectFit="cover" src={page.icon} alt={"link-icon"} />
                </Center>
              )}
              <Text
                overflowWrap={"anywhere"}
                textOverflow={"ellipsis"}
                noOfLines={1}
              >
                {page.link}
              </Text>
            </Flex>
            {/* created date DD/MM/YYYY, HH:MM (am/pm)*/}
            <Text
              textStyle="cardBody"
              align="start"
              overflowWrap={"anywhere"}
              noOfLines={1}
              fontSize={"md"}
              color="grey"
            >
              {`${new Date(
                page.createdAt || ""
              ).toLocaleDateString()}, ${formatAMPM(
                new Date(page.createdAt || "")
              )}`}
            </Text>
          </VStack>
        </CardBody>

        {/* <CardFooter justifyContent='flex-end'></CardFooter> */}
      </Card>
    </>
  );
};
