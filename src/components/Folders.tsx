import { Article as IArticle } from "@/typings/article/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight } from "lucide-react";
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

  function generateColorBaseOnSeed(seed: string) {
    const randomColorBase = theme === "light" ? "light" : "dark";
    const color = randomColor({
      luminosity: randomColorBase,
      seed: seed,
    });
    return color;
  }

  return (
    <>
      {props.folders.map((folder, index) => (
        <Button variant={"outline"} asChild>
          <Card
            key={index}
            className="flex h-10 flex-row items-center justify-center"
          >
            {folder.name}
          </Card>
        </Button>
      ))}
    </>
  );
};

export default Folders;
