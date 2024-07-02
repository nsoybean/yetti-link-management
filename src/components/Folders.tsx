import { FolderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Folder as IFolder } from "@/typings/folder/type";
import FolderOptions from "./FolderOptions";
import { useViewArticleMode } from "@/hooks/useArticleViewMode";
import { DroppableWrapper } from "./DroppableWrapper";

type Props = {
  folder: IFolder;
};

export const Folder = ({ folder }: Props) => {
  const navigate = useNavigate();
  const { mode } = useViewArticleMode();

  return (
    <DroppableWrapper
      id={`${folder._id}`}
      children={
        <div
          className={`h-15 ${mode === "list" && "my-2"} flex flex-row items-center rounded-md border border-input bg-background px-4 py-2 shadow-sm hover:bg-accent hover:text-accent-foreground`}
          onClick={() => {
            navigate(`/saves/folder/${folder._id}`);
          }}
        >
          {/* icon and name */}
          <div className="flex flex-grow flex-row items-center overflow-hidden">
            <FolderIcon className="mr-3 h-5 w-5 shrink-0" />
            <div className="truncate"> {folder.name} </div>
          </div>

          {/* options */}
          <div
            className="ml-2 flex items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the folder click event
            }}
          >
            <FolderOptions folder={folder} />
          </div>
        </div>
      }
    />
  );
};
