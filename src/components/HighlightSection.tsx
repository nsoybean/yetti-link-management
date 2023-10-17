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
} from "@chakra-ui/react";

import { IHighlightType } from "../types";

interface HighlightProps {
  highlights: IHighlightType[];
}

const HighlightSection: React.FC<HighlightProps> = ({
  highlights,
}: HighlightProps) => {
  return (
    <Container maxW="container.lg" py={[4, 8]}>
      <SimpleGrid spacingX={10} spacingY={4} minChildWidth="300px">
        {highlights.map(({ title, description, icon }, i: number) => (
          <Box p={4} rounded="md" key={`highlight_${i}`}>
            <Text fontSize="4xl">{icon}</Text>

            <Text fontWeight={500}>{title}</Text>

            <Text color="gray.400" mt={4}>
              {description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HighlightSection;
