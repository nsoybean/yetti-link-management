import {
  Box,
  Center,
  Container,
  Wrap,
  WrapItem,
  Text,
  Image,
  VStack,
  SimpleGrid,
  Heading,
  Stack,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import TiptapDemoInstance from "./TiptapDemoInstance";
import addNotes from "../Assets/addNotes.svg";
import { useState } from "react";

const editorFeatures = [
  "Text formatting",
  "Undo Redo",
  "Media and links",
  "Spelling and grammar check",
  "Tables and lists",
  "Save and export",
];

const EditorDemoSection: React.FC = () => {
  const [isDemoEnabled, setIsDemoEnabled] = useState<boolean>(false);
  function demo() {
    setIsDemoEnabled(true);
  }

  return (
    // becomes row beyond 3rd breakpoint
    <Flex justifyContent={"center"} py={"2"}>
      <Center
        w="100%"
        minH={[null, "60vh"]}
        bg={"white"}
        _dark={{ bg: "#000" }}
        borderRadius={"lg"}
      >
        <Stack
          spacing={[0, 2, 8]}
          alignItems="center"
          justifyContent={"center"}
          direction={["column", null, "row-reverse"]}
          w="full"
          h="full"
        >
          {/* image */}
          <Box>
            <Image
              p={"2"}
              src={addNotes}
              boxSize={["200px", "250px", "300px"]}
              alt={`adding-notes`}
            />
          </Box>

          {/* editor */}
          <VStack
            justifyContent="center"
            p={"2"}
            minHeight="35vh"
            my={[2, 2]}
            py={[2, 2]}
            _dark={{ bg: "#000" }}
            maxW={[null, null, "50%"]}
            w={["90%", "90%", "90%"]}
          >
            <Heading size="xl" textAlign={"center"}>
              Notion-Style <br />
              Rich Text Editor
            </Heading>
            <Text fontSize="lg" color="gray.500" textAlign={"center"}>
              Enrich your save articles by adding your own notes
            </Text>
            {/* temp commented out till features are built */}
            {/* <SimpleGrid
              maxW={"80%"}
              w="100%"
              // columns={2}
              border="1px solid red"
              spacingX={1}
              spacingY={1}
              minChildWidth="150px"
            >
              {editorFeatures.map((value, i: number) => (
                <HStack p={1} rounded="md" key={`highlight_${i}`}>
                  <CheckIcon boxSize={4} color="green" />
                  <Text fontWeight={500}>{value}</Text>
                </HStack>
              ))}
            </SimpleGrid> */}

            {!isDemoEnabled && (
              <Button
                bgGradient="linear(to-l, #a228ca, #FF0080)"
                _hover={{ bgGradient: "linear(to-l, #be58df, #ff3d9e)" }}
                _dark={{
                  bgGradient: "linear(to-l, #7928CA, #FF0080)",
                  _hover: { bgGradient: "linear(to-l, #6622aa, #d6006c)" },
                }}
                onClick={demo}
                mt={"4"}
              >
                Try live demo!
              </Button>
            )}

            {/* show editor only when demo enabled */}
            {isDemoEnabled && <TiptapDemoInstance />}
          </VStack>
        </Stack>
      </Center>
    </Flex>
  );
};

export default EditorDemoSection;
