import { Editor } from "@tiptap/react";
import { ReactNode } from "react";
import { Range } from "@tiptap/core";

export interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface CommandProps {
  editor: Editor;
  range: Range;
}
