import { Article as IArticle } from "@/typings/article/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ArticleOptions from "./ArticleOptions";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  article: IArticle;
};

export const ArticleList = ({ article }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: article._id,
  });

  const style = transform
    ? {
        transform: `scale(0.95) translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex touch-none flex-col shadow-md"
    >
      <div className="flex flex-row gap-2 p-3">
        <GripVertical
          {...attributes}
          {...listeners}
          className="h-auto cursor-grab py-1 text-secondary-foreground/50"
        />

        {/* header */}
        <CardHeader className="flex flex-col justify-around px-1 py-1">
          {/* title */}
          <CardTitle className="line-clamp-1">{article.title}</CardTitle>
          {/* domain */}
          <CardDescription className="line-clamp-1 font-bold">
            {article.domain}
          </CardDescription>
        </CardHeader>
      </div>

      {/* content */}
      <CardContent className="flex w-full flex-row flex-wrap items-end justify-between pb-2 pt-0">
        <div className="flex flex-col gap-2">
          {/* badge */}
          {/* <div>
                  {article?.tagIds?.length > 0 &&
                    article.tagIds.map((tag, index) => (
                      <Badge
                        className="max-w-24 hover:cursor-pointer"
                        variant={"secondary"}
                        key={index}
                        onClick={() => {
                          if (
                            // ignore if already in query by tag page
                            routes.TagSavesPageRoute.to ===
                            window.location.pathname
                          ) {
                            return;
                          }

                          navigate(`/tags/saves?tag=${tag.name}`);
                        }}
                      >
                        <p className="overflow-hidden truncate font-semibold">
                          {tag.name}
                        </p>
                      </Badge>
                    ))}
                </div> */}

          {/* date */}
          <CardDescription className="text-sm text-muted-foreground">
            {dayjs(article.createdAt).format("MMMM DD, YYYY h:mm A")}
          </CardDescription>
        </div>

        {/* actions */}
        <div className="flex h-10 flex-row items-center justify-center gap-1">
          <Button className="w-fit" asChild>
            <a rel="noopener noreferrer" href={article.link} target="_blank">
              <OpenInNewWindowIcon className="h-4 w-4" />
            </a>
          </Button>
          <ArticleOptions article={article} />
        </div>
      </CardContent>
    </Card>
  );
};
