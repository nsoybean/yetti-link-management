import { mode } from "@chakra-ui/theme-tools";

export const editorStyles = {
  global: (props: any) => ({
    body: {
      // suggestions slash command
      ".suggestion-selected": {
        bg: mode("#E2E8F0", "#718096")(props), // or  "gray.100"
      },
      // feedback form
      ".frf-water": { display: "none", borderRadius: "100px" },
      ".frf-trigger-button": {
        borderRadius: "100px",
      },
      // bubble menu active text style
      ".is-active": {
        backgroundColor: mode("#E2E8F0", "#718096")(props),
      },
      ".menububble": {
        backgroundColor: mode("rgba(255,255,255, 1)", "#2d3748")(props),
      },
      ".main-container": {
        minHeight: "100vh",
      },
      a: {
        textDecoration: "none",
      },
      "*, ::before, ::after": {
        borderColor: "#9fa3b114",
      },
      ".clear": {
        clear: "both",
      },
      // editor
      ".ProseMirror": {
        "box-sizing": "border-box",
        padding: "10px",
        "> * + *": {
          marginTop: "0.75em",
        },
        "p.is-editor-empty:first-child::before": {
          content: "attr(data-placeholder)",
          color: "black.500",
          float: "left",
          pointerEvents: "none",
          height: 0,
        },
        "p.is-empty::before": {
          content: "attr(data-placeholder)",
          color: "black.500",
          float: "left",
          pointerEvents: "none",
          height: 0,
        },
        p: {
          margin: "1px 1px 1px 1px",
        },
        a: {
          color: mode("#718096", "#CBD5E0")(props),
          "font-weight": 800,
          textDecoration: "underline",
          "&:hover": {
            cursor: "pointer",
          },
        },
        "&:focus": {
          padding: "10px",
        },
        "&:hover": {
          borderRadius: "5px",
          border: "1px solid rgb(229, 228, 226, 0.5)",
        },
        h1: {
          fontSize: "2rem",
        },
        h2: {
          fontSize: "1.75rem",
        },
        h3: {
          fontSize: "1.5rem",
        },
        h4: {
          fontSize: "1.25rem",
        },
        h5: {
          fontSize: "1rem",
        },
        "h1, h2, h3, h4, h5": {
          lineHeight: "1.1",
          fontWeight: "700",
        },
        "ul, ol": {
          padding: "0 1.2rem",
        },
        "ul label p": {
          color: "red",
        },
        // inline code
        code: {
          background: mode("#e7e5e4", "gray.500")(props),
          color: mode("black", "whiteAlpha.900")(props),
          borderRadius: "5px",
          padding: "1px 5px 1px 5px",
        },
        pre: {
          fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
          background: mode("gray.900", "gray.900")(props),
          color: mode("white", "white")(props),
          padding: "0.75rem 1rem",
          margin: "15px 0px",
          borderRadius: "lg",
          whiteSpace: "pre-wrap",
          // code in codeblock
          code: {
            color: "inherit",
            padding: 0,
            background: "none",
            fontSize: "0.9rem",
          },
          ".hljs-comment, .hljs-quote": {
            color: "#616161",
          },
          ".hljs-variable, .hljs-template-variable, .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class":
            {
              color: "#F98181",
            },
          ".hljs-number, .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal, .hljs-type, .hljs-params":
            {
              color: "#FBBC88",
            },
          ".hljs-string, .hljs-symbol, .hljs-bullet": {
            color: "#B9F18D",
          },
          ".hljs-title, .hljs-section": {
            color: "#FAF594",
          },
          ".hljs-keyword, .hljs-selector-tag": {
            color: "#70CFF8",
          },
          ".hljs-emphasis": {
            fontStyle: "italic",
          },
          ".hljs-strong": {
            fontWeight: 700,
          },
        },
        blockquote: {
          paddingLeft: "1rem",
          marginLeft: "1rem",
          borderLeft: "4px solid rgba(13, 13, 13, 0.3)",
          borderLeftColor: mode("#E2E8F0", "#718096")(props),
        },
        "span[data-spoiler]": {
          backgroundColor: mode("gray.900", "gray.100")(props),
          _hover: {
            backgroundColor: "transparent",
          },
        },
        img: {
          maxWidth: "80%",
          height: "auto",
        },
        mark: {
          backgroundColor: "#FAF594",
        },
        hr: {
          border: "none",
          borderTop: mode(
            "2px solid rgb(80,80,80,0.2)",
            "2px solid rgb(255,255,255,0.2)"
          )(props),
          margin: "2rem 0",
        },
        // checkbox
        'ul[data-type="taskList"]': {
          "list-style": "none",
          padding: 0,
          p: {
            margin: 0,
          },
          li: {
            display: "flex",
            "> label": {
              flex: "0 0 auto",
              "margin-right": "0.5rem",
              "user-select": "none",
            },
            "> div": {
              flex: "1 1 auto",
            },
          },
        },
      },
    },
  }),
};
