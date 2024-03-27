import { useEffect, useState } from "react";
import { parseAuthFromRedirectUrl } from "@/lib/auth";
import { setAuthToken } from "@/configs/auth";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllArticles } from "@/api/articles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ToolTipText from "@/components/TooltipText";
import { Article } from "@/typings/article/Article";
import { ArrowRight } from "lucide-react";
import ArticleOptions from "@/components/ArticleOptions";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { PlusIcon } from "@radix-ui/react-icons";
import { SaveArticleInput } from "@/components/SaveArticleInput";
import yetti from "/cuteCreativeYeti.jpeg";

const Saves = () => {
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    // parse token and save in storage after SSO redirect
    const url = window.location.href;
    if (url.includes("access_token")) {
      const userAuth = parseAuthFromRedirectUrl(url);

      if (userAuth.accessToken) {
        setAuthToken(userAuth.accessToken);
        // clear local window url
        window.history.replaceState("", "", "/saves");
      } else {
        console.error("failed authentication");
      }
    }
  }, []);

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery({
    queryKey: ["get-all-articles", currPage],
    queryFn: async () => getAllArticles(currPage),
  });

  function renderArticles(articles: Article[]) {
    return articles.map((article, index) => (
      <Card key={index} className="flex flex-col justify-between">
        {/* header */}
        <CardHeader className="p-3">
          {/* if img exist */}
          {article.image ? (
            <div className="mb-2 h-36 w-full rounded-lg object-cover object-center sm:h-48">
              <img
                src={article.image}
                alt={"image"}
                className="h-full w-full rounded-lg object-cover object-center"
              />
            </div>
          ) : (
            // else fallback to link[0] letter
            <div
              style={{ backgroundColor: article.color || "#87c3ff" }}
              className={`h-30
               relative mb-2 flex w-full items-center justify-start overflow-hidden rounded-lg pl-[30px] text-[150px] font-bold  sm:h-48`}
            >
              {article?.title?.charAt(0) || "P"}
            </div>
          )}
          {/* title and desc */}
          <div className="flex flex-col justify-around gap-2">
            <ToolTipText
              child={
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              }
              text={article.title}
            />
            <ToolTipText
              child={
                <CardDescription className="line-clamp-2">
                  {article.description}
                </CardDescription>
              }
              text={article.description}
            />
          </div>
        </CardHeader>
        {/* content */}
        <CardContent className="grid gap-4"></CardContent>
        <CardFooter className="w-full gap-1">
          <Button className="w-full" asChild>
            <a rel="noopener noreferrer" href={article.link} target="_blank">
              <span>Visit</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <ArticleOptions article={article} />
        </CardFooter>
      </Card>
    ));
  }

  // empty
  if (!isLoading && articles?.total_records === 0) {
    return (
      <div className="container mx-auto flex justify-center px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-10">
          <img className="w-[180px] rounded-full md:w-[220px]" src={yetti} />

          {/* text */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-md scroll-m-20">Start by adding a link!</h1>

            <SaveArticleInput
              trigger={
                <Button>
                  <span>Add Link</span>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              }
              onEventListener={false}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full">
      {/* article grid */}
      <div className="mb-12 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
        {/* loading */}
        {isLoading && <ArticleSkeleton numCards={6} />}

        {/* show articles */}
        {articles && renderArticles(articles.data)}
      </div>
      {/* pagination */}
      <div className="bottom-0 mb-10">
        <ArticlePagination
          currentPage={currPage}
          setPage={setCurrPage}
          recordsPerPage={9}
          totalRecords={articles?.total_records || 0}
        />
      </div>
    </main>
  );
};

export default Saves;
