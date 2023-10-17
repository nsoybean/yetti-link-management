import { ChakraProvider, Box } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useState } from "react";
// @ts-ignore
import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet

import LayoutWithNav from "./components/LayoutWithNav";
import SavePage from "./pages/saves/SavePage";
import ArchivePage from "./pages/archives/ArchivePage";
import EditorPage from "./pages/editor/EditorPage";
import { extendTheme } from "@chakra-ui/react";
import { customColors } from "./components/ui/colors";
import customBreakpoints from "./components/ui/breakpoints";
import space from "./components/ui/spacing";
import textStyles from "./components/ui/textStyles";
import { inputTheme } from "./components/ui/customComponents/input";
import { cardTheme } from "./components/ui/customComponents/card";
import { buttonTheme } from "./components/ui/customComponents/button";
import HomePage from "./pages/home/HomePage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./api/context/authContext";
import { BookmarkProvider } from "./api/context/bookmarkContext";
import { ArchiveBookmarkProvider } from "./api/context/archiveBookmarkContext";
import AuthGlobalModal from "./components/AuthGlobalModal";
import { BookmarkChangeContext } from "./api/context/bookmarkChangeContext";
import { editorStyles } from "./styles/editor.styles";

const theme = extendTheme({
  styles: editorStyles,
  colors: customColors,
  breakpoints: customBreakpoints,
  space: space,
  textStyles: textStyles,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Input: inputTheme,
    Card: cardTheme,
    Button: buttonTheme,
    IconButton: buttonTheme,
    EditorPage,
  },
});

export const App = () => {
  const [bookmarkChange, setBookmarkChange] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <>
      <Feedback
        projectId={process.env.REACT_APP_FEEDBACK_PROJ_ID}
        email={true}
        emailRequired={false}
        projectName={process.env.REACT_APP_FEEDBACK_PROJ_NAME}
        primaryColor={"#7c70d2"}
      />
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <BookmarkChangeContext.Provider
            value={{ bookmarkChange, setBookmarkChange }}
          >
            <AuthProvider>
              {/* as inputSave component in navbar uses bookmark context */}
              <Box height="100vh" mx="auto" p={1} boxSizing="border-box">
                <BrowserRouter>
                  <AuthGlobalModal />
                  <Routes>
                    <Route path="/" element={<LayoutWithNav />}>
                      <Route index element={<Navigate to="/home" />} />
                      <Route path="home" element={<HomePage />} />
                      <Route path=":page/note/:id" element={<EditorPage />} />
                      <Route path="saves" element={<SavePage />} />
                      <Route path="archives" element={<ArchivePage />} />
                      <Route path="stats" />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </Box>
            </AuthProvider>
          </BookmarkChangeContext.Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
};
