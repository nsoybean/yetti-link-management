import { THEME_PROVIDER_STORAGE_KEY } from "@/configs/env";
import { createContext, useContext, useEffect, useState } from "react";

type ViewArticleMode = "list" | "gallery";

type ViewArticleProviderProps = {
  children: React.ReactNode;
  defaultMode?: ViewArticleMode;
  storageKey?: string;
};

type ViewArticleProviderState = {
  mode: ViewArticleMode;
  setMode: (mode: ViewArticleMode) => void;
};

const initialState: ViewArticleProviderState = {
  mode: "gallery",
  setMode: () => null,
};

const ViewArticleProviderContext =
  createContext<ViewArticleProviderState>(initialState);

export function ViewArticleModeProvider({
  children,
  defaultMode = "gallery",
  storageKey = THEME_PROVIDER_STORAGE_KEY,
  ...props
}: ViewArticleProviderProps) {
  const [mode, setMode] = useState<ViewArticleMode>(
    () => (localStorage.getItem(storageKey) as ViewArticleMode) || defaultMode,
  );

  const value = {
    mode,
    setMode: (mode: ViewArticleMode) => {
      localStorage.setItem(storageKey, mode);
      setMode(mode);
    },
  };

  return (
    <ViewArticleProviderContext.Provider {...props} value={value}>
      {children}
    </ViewArticleProviderContext.Provider>
  );
}

export const useViewArticleMode = () => {
  const context = useContext(ViewArticleProviderContext);

  if (context === undefined)
    throw new Error(
      "useViewArticleMode must be used within a ViewArticleModeProvider",
    );

  return context;
};
