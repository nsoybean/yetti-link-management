import { useEffect, useState } from "react";
import { parseAuthFromRedirectUrl } from "@/lib/auth";
import { setAuthToken } from "@/configs/auth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllArchivedArticles } from "@/api/articles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@/typings/article/Article";
import { ArrowRight } from "lucide-react";
import ArticleOptions from "@/components/ArticleOptions";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import ArticlePagination from "@/components/ArticlePagination";

const Archives = () => {
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
    queryKey: ["get-all-archived-articles", currPage],
    queryFn: async () => getAllArchivedArticles(currPage),
    placeholderData: keepPreviousData,
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
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {article.description}
            </CardDescription>
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
      <div className="container mx-auto flex justify-center py-16">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* svg */}
          <svg viewBox="0 0 647.636 632.174">
            <path
              d="M411.146 142.174h-174.51a15.02 15.02 0 0 0-15 15v387.85l-2 .61-42.81 13.11a8.007 8.007 0 0 1-9.99-5.31l-127.34-415.95a8.003 8.003 0 0 1 5.31-9.99l65.97-20.2 191.25-58.54 65.97-20.2a7.99 7.99 0 0 1 9.99 5.3l32.55 106.32Z"
              fill="#f2f2f2"
            />
            <path
              d="m449.226 140.174-39.23-128.14a16.994 16.994 0 0 0-21.23-11.28l-92.75 28.39-191.24 58.55-92.75 28.4a17.015 17.015 0 0 0-11.28 21.23l134.08 437.93a17.03 17.03 0 0 0 16.26 12.03 16.8 16.8 0 0 0 4.97-.75l63.58-19.46 2-.62v-2.09l-2 .61-64.17 19.65a15.015 15.015 0 0 1-18.73-9.95L2.666 136.734a14.98 14.98 0 0 1 9.95-18.73l92.75-28.4 191.24-58.54 92.75-28.4a15.2 15.2 0 0 1 4.41-.66 15.015 15.015 0 0 1 14.32 10.61l39.05 127.56.62 2h2.08Z"
              fill="#3f3d56"
            />
            <path
              d="M122.68 127.82a9.02 9.02 0 0 1-8.61-6.366l-12.88-42.072a9 9 0 0 1 5.97-11.24L283.1 14.278a9.01 9.01 0 0 1 11.24 5.971l12.88 42.072a9.01 9.01 0 0 1-5.97 11.241l-175.94 53.864a9 9 0 0 1-2.63.395"
              fill="#6c63ff"
            />
            <circle cx="190.154" cy="24.955" r="20" fill="#6c63ff" />
            <circle cx="190.154" cy="24.955" r="12.665" fill="#fff" />
            <path
              d="M602.636 582.174h-338a8.51 8.51 0 0 1-8.5-8.5v-405a8.51 8.51 0 0 1 8.5-8.5h338a8.51 8.51 0 0 1 8.5 8.5v405a8.51 8.51 0 0 1-8.5 8.5"
              fill="#e6e6e6"
            />
            <path
              d="M447.136 140.174h-210.5a17.024 17.024 0 0 0-17 17v407.8l2-.61v-407.19a15.02 15.02 0 0 1 15-15h211.12Zm183.5 0h-394a17.024 17.024 0 0 0-17 17v458a17.024 17.024 0 0 0 17 17h394a17.024 17.024 0 0 0 17-17v-458a17.024 17.024 0 0 0-17-17m15 475a15.02 15.02 0 0 1-15 15h-394a15.02 15.02 0 0 1-15-15v-458a15.02 15.02 0 0 1 15-15h394a15.02 15.02 0 0 1 15 15Z"
              fill="#3f3d56"
            />
            <path
              d="M525.636 184.174h-184a9.01 9.01 0 0 1-9-9v-44a9.01 9.01 0 0 1 9-9h184a9.01 9.01 0 0 1 9 9v44a9.01 9.01 0 0 1-9 9"
              fill="#6c63ff"
            />
            <circle cx="433.636" cy="105.174" r="20" fill="#6c63ff" />
            <circle cx="433.636" cy="105.174" r="12.182" fill="#fff" />
          </svg>

          {/* text */}
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-md scroll-m-20 text-primary">
              No archived articles
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* article grid */}
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default Archives;
