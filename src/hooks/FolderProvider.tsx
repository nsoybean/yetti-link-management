import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ROOT_FOLDER__VALUE = "root";

type FolderProviderState = {
  folder: string | null;
  setFolder: (id: string) => void;
};

const initialState: FolderProviderState = {
  folder: null,
  setFolder: () => null,
};

// context
const FolderProviderContext = createContext<FolderProviderState>(initialState);

// provider
export const FolderProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  // get param from url
  const [folder, setFolder] = useState(ROOT_FOLDER__VALUE);

  const folderObject = useMemo(() => {
    return { folder, setFolder };
  }, [folder, setFolder]);

  return (
    <FolderProviderContext.Provider {...props} value={folderObject}>
      {children}
    </FolderProviderContext.Provider>
  );
};

export const useFolder = () => {
  const context = useContext(FolderProviderContext);
  if (context === undefined) {
    throw new Error("useFolder must be used within a FolderProvider");
  }
  return context;
};

export default FolderProvider;
