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
      <Card key={index} className="w-90 flex flex-1 flex-col justify-between">
        {/* header */}
        <CardHeader className="p-3">
          {/* if img exist */}
          {article.image ? (
            <img
              src={article.image}
              alt={"article image"}
              className="h-30 mb-2 w-full rounded-lg object-cover object-center sm:h-48"
            />
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
          {/* svg */}
          <svg viewBox="0 0 485.834 483.5">
            <path
              d="M320.459 128.097h-79.742a11.48 11.48 0 0 1-9.065-4.393 11.62 11.62 0 0 1-2.177-9.968 201.6 201.6 0 0 0 0-93.647 11.62 11.62 0 0 1 2.176-9.967 11.48 11.48 0 0 1 9.066-4.394h79.742a11.624 11.624 0 0 1 11.439 9.755 338 338 0 0 1 0 102.859 11.624 11.624 0 0 1-11.44 9.755"
              fill="#e6e6e6"
            />
            <path
              d="M240.717 11.728a5.51 5.51 0 0 0-4.354 2.108 5.66 5.66 0 0 0-1.054 4.854 207.66 207.66 0 0 1 0 96.445 5.66 5.66 0 0 0 1.054 4.853 5.51 5.51 0 0 0 4.354 2.11h79.742a5.58 5.58 0 0 0 5.509-4.668 332 332 0 0 0 0-101.035 5.58 5.58 0 0 0-5.51-4.667Z"
              fill="#fff"
            />
            <path
              d="M303.057 40.579h-41.845a6.006 6.006 0 0 1-6-6v-2.345a6.006 6.006 0 0 1 6-6h41.845a6.006 6.006 0 0 1 6 6v2.345a6.006 6.006 0 0 1-6 6m0 29.626h-41.845a6.006 6.006 0 0 1-6-6V61.86a6.006 6.006 0 0 1 6-6h41.845a6.006 6.006 0 0 1 6 6v2.345a6.006 6.006 0 0 1-6 6m0 29.625h-41.845a6.006 6.006 0 0 1-6-6v-2.344a6.006 6.006 0 0 1 6-6h41.845a6.006 6.006 0 0 1 6 6v2.345a6.006 6.006 0 0 1-6 6m167.402 104.266h-79.742a11.48 11.48 0 0 1-9.065-4.393 11.62 11.62 0 0 1-2.177-9.968 201.6 201.6 0 0 0 0-93.647 11.62 11.62 0 0 1 2.176-9.967 11.48 11.48 0 0 1 9.066-4.394h79.742a11.624 11.624 0 0 1 11.439 9.755 338 338 0 0 1 0 102.859 11.624 11.624 0 0 1-11.44 9.755"
              fill="#e6e6e6"
            />
            <path
              d="M390.717 87.728a5.51 5.51 0 0 0-4.354 2.108 5.66 5.66 0 0 0-1.054 4.854 207.66 207.66 0 0 1 0 96.445 5.66 5.66 0 0 0 1.054 4.853 5.51 5.51 0 0 0 4.354 2.11h79.742a5.58 5.58 0 0 0 5.509-4.668 332 332 0 0 0 0-101.035 5.58 5.58 0 0 0-5.51-4.667Z"
              fill="#fff"
            />
            <path
              d="M311.459 290.597h-79.742a11.98 11.98 0 0 1-9.458-4.584 12.12 12.12 0 0 1-2.27-10.394 201.1 201.1 0 0 0 0-93.413 12.12 12.12 0 0 1 2.27-10.394 11.98 11.98 0 0 1 9.458-4.584h79.742a12.13 12.13 0 0 1 11.933 10.18 338.5 338.5 0 0 1 0 103.01 12.13 12.13 0 0 1-11.933 10.18"
              fill="#f2f2f2"
            />
            <path
              d="M453.057 131.579h-41.845a6.006 6.006 0 0 1-6-6v-2.345a6.006 6.006 0 0 1 6-6h41.845a6.006 6.006 0 0 1 6 6v2.345a6.006 6.006 0 0 1-6 6m0 29.626h-41.845a6.006 6.006 0 0 1-6-6v-2.345a6.006 6.006 0 0 1 6-6h41.845a6.006 6.006 0 0 1 6 6v2.345a6.006 6.006 0 0 1-6 6"
              fill="#e6e6e6"
            />
            <circle cx="271.811" cy="228.5" r="23" fill="#fff" />
            <path
              d="M282.811 225.5h-8v-8a3 3 0 0 0-6 0v8h-8a3 3 0 0 0 0 6h8v8a3 3 0 0 0 6 0v-8h8a3 3 0 0 0 0-6"
              fill="#e6e6e6"
            />
            <path
              d="M300.811 17h-42a4.505 4.505 0 0 1-4.5-4.5v-8a4.505 4.505 0 0 1 4.5-4.5h42a4.505 4.505 0 0 1 4.5 4.5v8a4.505 4.505 0 0 1-4.5 4.5m152 77h-42a4.505 4.505 0 0 1-4.5-4.5v-8a4.505 4.505 0 0 1 4.5-4.5h42a4.505 4.505 0 0 1 4.5 4.5v8a4.505 4.505 0 0 1-4.5 4.5"
              fill="#ccc"
            />
            <path
              fill="#ffb8b8"
              d="M88.596 471.061h12.26l3.833-47.288H88.594z"
            />
            <path
              d="M85.47 467.058h24.144A15.386 15.386 0 0 1 125 482.443v.5l-39.53.001Z"
              fill="#2f2e41"
            />
            <path
              fill="#ffb8b8"
              d="M22.596 471.061h12.26l5.833-47.288H22.594z"
            />
            <path
              d="M19.47 467.058h24.144A15.386 15.386 0 0 1 59 482.443v.5l-39.53.001Zm5.301-10.935a4.98 4.98 0 0 1-3.375-1.319 4.96 4.96 0 0 1-1.616-3.537l-4.916-176.213 69.811 17.452 21.54 64.618a70.5 70.5 0 0 1 3.545 25.824l-2.675 62.636a4.996 4.996 0 0 1-4.994 4.76H90.382a5.02 5.02 0 0 1-4.955-4.33l-8.369-69.142a37.8 37.8 0 0 0-5.531-15.164l-16.47-26.076a1 1 0 0 0-1.838.41L40.295 451.13a4.99 4.99 0 0 1-4.687 4.397l-10.552.587q-.142.008-.285.009"
              fill="#2f2e41"
            />
            <circle cx="73.058" cy="136.406" r="24.561" fill="#ffb8b8" />
            <path
              d="M84.34 299.672a5 5 0 0 1-1.252-.159h-.001l-69.264-17.76a5 5 0 0 1-3.663-5.815l15.907-85.69a31.21 31.21 0 0 1 18.25-22.54 30.11 30.11 0 0 1 28.265 2.075c.97.605 1.947 1.264 2.903 1.96a30.96 30.96 0 0 1 12.579 24.53l1.265 98.329a5.007 5.007 0 0 1-4.988 5.07"
              fill="#6c63ff"
            />
            <path
              d="M20.95 300.68a10.056 10.056 0 0 1 4.213-14.832l-3.08-35.602 16.326 8.848.422 32.452a10.11 10.11 0 0 1-17.882 9.134"
              fill="#ffb8b8"
            />
            <path
              d="M26.782 281.14a5.5 5.5 0 0 1-1.366-.174 5.5 5.5 0 0 1-3.972-3.986l-8.023-31.884a47.37 47.37 0 0 1 3.761-33.135l16.81-32.881a15.54 15.54 0 0 1 18.807-11.019 15.36 15.36 0 0 1 9.475 7.1 15.57 15.57 0 0 1 1.654 11.914L40.001 240.58l.284 32.035a5.52 5.52 0 0 1-3.585 5.205l-8.007 2.973a5.5 5.5 0 0 1-1.911.345"
              fill="#6c63ff"
            />
            <path
              d="M141.318 287.585a10.056 10.056 0 0 1-8.493-12.87l-28.994-20.89 17.357-6.6 24.872 20.848a10.11 10.11 0 0 1-4.742 19.512"
              fill="#ffb8b8"
            />
            <path
              d="M126.14 272.33a5.5 5.5 0 0 1-2.463-.581l-29.399-14.717a47.38 47.38 0 0 1-22.66-24.466l-13.958-34.19a15.544 15.544 0 0 1 3.918-21.444 15.35 15.35 0 0 1 11.59-2.544A15.57 15.57 0 0 1 83.25 180.9l24.945 53.04 24.466 20.683a5.52 5.52 0 0 1 1.607 6.111l-2.97 8.009a5.47 5.47 0 0 1-2.007 2.596 5.5 5.5 0 0 1-3.15.992"
              fill="#6c63ff"
            />
            <path
              d="M67.9 161.343c1.305.571 3.977-9.827 2.78-11.907-1.78-3.093-1.675-3.07-2.856-5.117s-1.447-4.847.084-6.648 5.072-1.561 5.77.696c-.45-4.288 3.792-7.734 7.993-8.703s8.633-.367 12.857-1.23c4.902-1 10.003-5.109 8.047-10.5a7.6 7.6 0 0 0-1.481-2.434c-2.26-2.54-5.421-3.626-8.512-4.675-6.43-2.182-13.036-4.392-19.822-4.151a28.8 28.8 0 0 0-25.446 18.609 26 26 0 0 0-1.084 4.025c-2.33 12.525 4.944 24.878 16.756 29.647Z"
              fill="#2f2e41"
            />
            <path
              opacity=".2"
              d="m38.9 273.343.557-32.929L56.9 205.343l-14 36z"
            />
            <path
              d="m197.077 355.982-73.638-30.595a11.48 11.48 0 0 1-6.686-7.536 11.62 11.62 0 0 1 1.814-10.04 201.6 201.6 0 0 0 35.93-86.48 11.62 11.62 0 0 1 5.835-8.369 11.48 11.48 0 0 1 10.058-.579l73.638 30.596a11.62 11.62 0 0 1 6.82 13.398 338 338 0 0 1-39.464 94.986 11.624 11.624 0 0 1-14.307 4.62"
              fill="#e6e6e6"
            />
            <path
              d="M168.088 217.924a5.51 5.51 0 0 0-4.83.276 5.66 5.66 0 0 0-2.836 4.078 207.66 207.66 0 0 1-37.004 89.064 5.66 5.66 0 0 0-.89 4.885l.001.001a5.51 5.51 0 0 0 3.212 3.618l73.638 30.596a5.58 5.58 0 0 0 6.878-2.197 332 332 0 0 0 38.766-93.302 5.58 5.58 0 0 0-3.297-6.423Z"
              fill="#fff"
            />
            <path
              d="m207.297 286.031-38.642-16.055a6.006 6.006 0 0 1-3.239-7.842l.9-2.166a6.006 6.006 0 0 1 7.842-3.238l38.643 16.055a6.006 6.006 0 0 1 3.238 7.843l-.9 2.165a6.006 6.006 0 0 1-7.842 3.238M195.93 313.39l-38.642-16.055a6.006 6.006 0 0 1-3.239-7.843l.9-2.165a6.006 6.006 0 0 1 7.842-3.239l38.643 16.056a6.006 6.006 0 0 1 3.238 7.842l-.9 2.165a6.006 6.006 0 0 1-7.842 3.239"
              fill="#6c63ff"
            />
            <path
              d="M222.781 247.582a4.5 4.5 0 0 1-1.687-.33l-38.938-15.743a4.505 4.505 0 0 1-2.485-5.859l2.998-7.417a4.5 4.5 0 0 1 5.859-2.484l38.938 15.742a4.505 4.505 0 0 1 2.485 5.859l-2.998 7.417a4.51 4.51 0 0 1-4.172 2.815M141 483.5H1a1 1 0 1 1 0-2h140a1 1 0 0 1 0 2"
              fill="#ccc"
            />
          </svg>

          {/* text */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-md scroll-m-20 text-primary">
              Start by adding a link!
            </h1>

            <SaveArticleInput
              trigger={
                <Button>
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Link</span>
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
    <main className="mx-auto">
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
