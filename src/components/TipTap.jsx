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
import {
  EditorContent,
  ReactNodeViewRenderer,
  useEditor,
  EditorProvider,
  FloatingMenu,
} from "@tiptap/react";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

// TODO @sb: implement collab with tiptap
// import Collaboration from '@tiptap/extension-collaboration'
// import { HocuspocusProvider } from '@hocuspocus/provider'

// react
import { useEffect, useContext, useState } from "react";
import {
  Button,
  Box,
  Wrap,
  Text,
  Flex,
  Spacer,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

// packages
import { lowlight } from "lowlight";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";

// custom
import { IBookmark } from "../types/saves";
import CodeBlockComponent from "./CodeBlockComponent";
import EditorMenuBarDemo from "./EditorMenuBarDemo";
import EditorBubbleMenu from "./EditorBubbleMenu";
import BookmarkAPI from "../api/BookmarkAPI";
import SlashCommand from "./SlashCommand";

// config
const charLimit = 5000;

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
    limit: charLimit,
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

  // TODO @sb: Set up collab
  // Collaboration.configure({
  //   document: provider.document,
  // }),
  // The Collaboration extension comes with its own history handling
  // history: false,
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
    // inclusive: false, // (not working) prevent rendering of link to continue to text
    HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
  }),

  SlashCommand,
];

// code block languages (alias)
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("typescript", ts);

export default ({ bookmarkId, bearerToken }) => {
  // render skeleton if either bookmarkId or token not avail
  if (!bookmarkId || !bearerToken) {
    return (
      <Box padding="6" boxShadow="md" bg="white">
        <SkeletonCircle size="20" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  let editor;
  if (bookmarkId) {
    // TODO @sb: Set up the Hocuspocus WebSocket provider
    // const provider = new HocuspocusProvider({
    //   url: 'ws://127.0.0.1:3338',
    //   name: bookmarkId,
    //   token: bearerToken,
    // })

    editor = useEditor({
      extensions: extensions,
      editorProps: editorProps,
      autofocus: true,
      injectCSS: false,
      onUpdate({ editor }) {
        // The content has changed
        // will show 'save' button
        setIsSaved(false);
      },
    });
  }

  const { mutate: updateBookmarkNotes } = useMutation(
    BookmarkAPI.updateBookMarkNotes
  );
  // to debounce editor's change and save interval
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);
  const [content, setContent] = useState({});
  const [isFetchedDocLoaded, setIsFetchedDocLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // checks if editor is empty
  function isEditorEmpty() {
    const isEmpty = !editor.state.doc.textContent.trim().length;
    return isEmpty;
  }

  // fetch bookmark data query
  const { data: bookmarkData } = useQuery({
    queryKey: [bookmarkId], // caching based on key
    queryFn: () => {
      console.log("🚀 fetchContent");
      return BookmarkAPI.getBookmarkById({
        id: bookmarkId,
        token: bearerToken,
      });
    },
    enabled: !!bookmarkId, // only when bkmarkId exist
  });

  // set 'content' react state (if any)
  useEffect(() => {
    // return early if bookmark's content is empty string (i.e. not initialized)
    // flow terminates here
    if (!bookmarkData || bookmarkData.note === "") {
      return;
    }

    // if data is present, set 'content' state
    const content = JSON.parse(bookmarkData.note);
    setContent(content);
  }, [bookmarkData]);

  // load fetched bookmark content (if any) into editor
  useEffect(() => {
    if (editor && Object.keys(content).length !== 0) {
      console.log("🚀 loadContent");
      // note: content may represent an empty node too
      editor?.commands?.setContent(content);
      setIsFetchedDocLoaded(true);
    }
  }, [editor, content]);

  // auto-save according to interval defined in useDebounce (i.e. 3 seconds)
  useEffect(() => {
    // TODO @sb: enable writing to local storage for offline usage
    // // save
    // const data = editor.getJSON()
    // localStorage.setItem('tiptap', JSON.stringify(data))
    // // fetch
    // editor?.commands?.setContent(JSON.parse(localStorage.getItem('tiptap')))
    console.log("🚀 debouncedEditor useEffect");

    if (editor) {
      // prevent save before content is fetched and loaded
      if (!isFetchedDocLoaded) {
        return;
      } else {
        // TODO @sb: prevent repeated save when content is first loaded
        saveContent();
      }
    }
  }, [debouncedEditor]);

  const saveContent = () => {
    // get content from editor
    const stringifiedContent = JSON.stringify(editor?.getJSON());

    // return early if nil
    if (stringifiedContent === "") {
      return;
    }

    console.log("🚀 saveContent");
    setIsSaving(true);

    // call update API
    updateBookmarkNotes(
      {
        id: bookmarkId,
        token: bearerToken,
        note: stringifiedContent,
      },
      {
        onSuccess: () => {
          setIsSaved(true);
        },
        onError: () => {
          toast.error("Error saving");
          setIsSaved(false);
        },
        onSettled: async () => {
          // mock delay to show spinner
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setIsSaving(false);
        },
      }
    );
  };

  if (!editor) {
    return null;
  }

  return (
    <Box padding={"5"}>
      <Flex justifyContent={"flex-start"}>
        {/* EDITOR */}
        <EditorMenuBarDemo editor={editor} />
        <EditorBubbleMenu editor={editor} />
      </Flex>
      <Box my={"2"}>
        <EditorContent editor={editor} />
      </Box>

      {/* FOOTER */}
      {editor && (
        <Wrap spacing="5">
          <Flex alignItems={"center"}>
            Characters:{" "}
            <Text ml="2" fontWeight="bold">
              {editor.storage.characterCount.characters().toLocaleString()} /
              {charLimit.toLocaleString()}
            </Text>
          </Flex>
          <Flex ml="4" alignItems={"center"}>
            Words:{" "}
            <Text ml="2" fontWeight="bold">
              {editor.storage.characterCount.words().toLocaleString()}{" "}
            </Text>
          </Flex>

          <Spacer />

          {/* when saving */}
          {isSaving ? (
            <Button variant="solid" width={"10%"} cursor="not-allowed">
              <Spinner color="brand.main" />
            </Button>
          ) : isSaved ? (
            <Button variant="solid" width={"10%"} cursor="not-allowed">
              Saved
            </Button>
          ) : (
            <Button variant="primary" width={"10%"} onClick={saveContent}>
              Save
            </Button>
          )}
        </Wrap>
      )}
    </Box>
  );
};
