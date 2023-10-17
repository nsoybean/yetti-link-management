/* eslint-disable import/no-anonymous-default-export */
// react
import {
  Button,
  Box,
  IconButton,
  Wrap,
  HStack,
  Tooltip,
  Text,
} from "@chakra-ui/react";

// icons
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineLine,
  AiOutlineUnderline,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatQuote,
  MdUndo,
  MdRedo,
} from "react-icons/md";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { BsFileEarmarkBreak } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import { BiParagraph } from "react-icons/bi";
import { BiCodeBlock } from "react-icons/bi";

import { BubbleMenu } from "@tiptap/react";

// custom
import { initialDataV2 } from "../data/mock/editorDefault";

const EditorMenuBarDemo = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <Wrap spacing="1">
      {/* MOCK */}
      <Box border="1px" borderColor="gray.200" borderRadius={"10"}>
        <Tooltip
          label="Insert mock data"
          placement="bottom"
          borderRadius={"10"}
        >
          <Button
            width={"1"}
            variant="ghost"
            aria-label="insert-demo-data"
            onClick={() => editor?.commands?.setContent(initialDataV2)}
          >
            Demo
          </Button>
        </Tooltip>
      </Box>
    </Wrap>
  );
};

export default EditorMenuBarDemo;
