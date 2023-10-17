/* eslint-disable import/no-anonymous-default-export */
// tiptap
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

// react
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

// packages
import { lowlight } from "lowlight";

// custom
import CodeBlockComponent from "./CodeBlockComponent";
import EditorBubbleMenu from "./EditorBubbleMenu";
import SlashCommand from "./SlashCommand";

// define editor props
const editorProps = {
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (["ArrowUp", "ArrowDown", "ArrowRight", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector(".slashCommand");
        if (slashCommand) {
          return true;
        }
      }
    },
  },
};

// define tiptap extension array
const extensions = [
  Document,
  Underline,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Typography,
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  CharacterCount.configure({
    limit: 500,
  }),
  Placeholder.configure({
    placeholder: "'/' for commands...",
  }),
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({ lowlight }),
  // Bubble Menu
  BubbleMenu.configure({
    element: document.querySelector(".menu"),
  }),
  Link.configure({
    openOnClick: true,
    protocols: [
      {
        scheme: "tel",
        optionalSlashes: true,
      },
    ],
    autolink: true,
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
  }),
  SlashCommand,
];

// code block languages (alias)
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("typescript", ts);

export default () => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: editorProps,
    injectCSS: false,
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: {
            textAlign: "center",
          },
          content: [
            {
              type: "text",
              text: "This is an example of our WYSIWYG rich text editor powered by ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: null,
                  },
                },
              ],
              text: "TipTap",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "center",
          },
          content: [
            {
              type: "text",
              text: "It’s only the tip of the iceberg though. Give it a try and click a little bit around.",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Wow, that’s amazing. Good work, boy! 👏 ",
                },
                {
                  type: "hardBreak",
                },
                {
                  type: "text",
                  text: "— Mom",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
      ],
    },
    autofocus: "end",

    // onFocus({ editor }) {
    //   defaultFocus();
    // },
    // onUpdate({editor}){updateLocalStorage()} // temp removed
  });

  function defaultFocus() {
    editor.commands.setTextSelection({ from: 0, to: 5 });
  }

  function updateLocalStorage() {
    const data = editor.getJSON();
    // console.log("🚀 data:", data)
    localStorage.setItem("editor_demo", JSON.stringify(data));
  }

  if (!editor) {
    return null;
  }

  return (
    <Box border={"1px"} borderColor={""} borderRadius={"md"} width={"100%"}>
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};
