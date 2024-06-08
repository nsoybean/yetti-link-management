import { Article as IArticle } from "@/typings/article/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, FolderIcon } from "lucide-react";
import ArticleOptions from "./ArticleOptions";
import ToolTipText from "./TooltipText";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import randomColor from "randomcolor";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { routes } from "@/router";
import { Folder } from "@/typings/folder/type";
import FolderOptions from "./FolderOptions";
import { useViewArticleMode } from "@/hooks/useArticleViewMode";

type Props = {
  folders: Folder[];
};

const Folders = (props: Props) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { mode } = useViewArticleMode();

  return props.folders.map((folder, index) => (
    // folder card
    <div
      key={index}
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
  ));
};

export default Folders;
