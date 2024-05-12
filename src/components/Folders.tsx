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

type Props = {
  folders: Folder[];
};

const Folders = (props: Props) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
      {props.folders.map((folder, index) => (
        <Button
          key={index}
          variant={"outline"}
          asChild
          onClick={() => navigate(`/saves/folder/${folder.id}`)}
        >
          <Card className="flex h-10 flex-row items-center justify-center shadow-sm">
            <FolderIcon className="mr-2 h-4 w-4" />
            {folder.name}
          </Card>
        </Button>
      ))}
    </>
  );
};

export default Folders;
