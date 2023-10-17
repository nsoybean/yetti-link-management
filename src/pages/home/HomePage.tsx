import React from "react";

import {
  Image,
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Flex,
  Container,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import blobImage from "../../Assets/blob-bg.png";
import astronautImg from "../../Assets/astronaut.png";
import HeroSection from "../../components/HeroSection";
import HighlightSection from "../../components/HighlightSection";
import EditorDemoSection from "../../components/EditorDemoSection";
import FeatureSection from "../../components/FeatureSection";

// data
import { highlights } from "../../data/highlights";
// base bg color: #e2e8f0

function HomePage() {
  return (
    // temp comment out astranaut (where should this be?)
    // <Box
    //   mx="auto"
    //   maxWidth={{
    //     base: "100%",
    //     "2xl": "80%",
    //   }}
    // >
    //   <Grid
    //     templateColumns={{
    //       base: "repeat(1, 1fr)",
    //       sm: "repeat(1, 1fr)",
    //       md: "repeat(1, 1fr)",
    //       lg: "repeat(2, 1fr)",
    //     }}
    //   >
    //     <GridItem
    //       colSpan={1}
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <VStack alignItems={"flex-start"}>
    //         <Text
    //           textStyle={{
    //             base: "landingSmall",
    //             sm: "landingBig",
    //           }}
    //           sx={{
    //             color: "brand.dark",
    //             _dark: {
    //               color: "#ddd8fe",
    //             },
    //           }}
    //         >
    //           Save Now
    //         </Text>
    //         <Text
    //           textStyle={{
    //             base: "landingSmall",
    //             sm: "landingBig",
    //           }}
    //           color="brand.main"
    //         >
    //           Read Later
    //         </Text>
    //       </VStack>
    //     </GridItem>
    //     <GridItem
    //       colSpan={1}
    //       height="70vh"
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Flex justifyContent="center" alignItems={"center"}>
    //         <Box
    //           position="relative"
    //           sx={{
    //             height: "350px",
    //             width: "350px",
    //             backgroundImage: `url(${blobImage})`,
    //             backgroundRepeat: "no-repeat",
    //             backgroundSize: "contain",
    //             transform: {
    //               base: "scale(0.9)",
    //               sm: "scale(1)",
    //               "2xl": "scale(1.3)",
    //             },
    //           }}
    //           top={{
    //             base: 0,
    //             md: 8,
    //             lg: 16,
    //           }}
    //         >
    //           <Image
    //             position="absolute"
    //             src={astronautImg}
    //             alt="blob-bg"
    //             width="100%"
    //             height="420px"
    //             zIndex={2}
    //             bottom={1}
    //             mx="auto"
    //           />
    //         </Box>
    //       </Flex>
    //     </GridItem>
    //   </Grid>
    // </Box>
    <Box bg="gray.50" _dark={{ bg: "#1a202c" }} justifyContent={"flex-end"}>
      <HeroSection />
      <EditorDemoSection />
      <HighlightSection highlights={highlights} />
    </Box>
  );
}

export default HomePage;
