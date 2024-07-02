import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/api/articles";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import ToolTipText from "@/components/TooltipText";
import ArticleSkeletonList from "@/components/ArticleSkeletonList";
import { useViewArticleMode } from "@/hooks/useArticleViewMode";
import { Article } from "@/components/Article";
import { ArticleList } from "@/components/ArticleList";

const TagSaves = () => {
  const [currPage, setCurrPage] = useState(1);
  const { mode } = useViewArticleMode();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get("tag");
  const searchQueryTag = paramValue?.split(",")[0];
  const navigate = useNavigate();

  // head back to main saves page, if no query 'tag' param found
  if (!searchQueryTag) {
    navigate("/saves");
  }

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery({
    queryKey: ["get-all-articles-by-tag", searchQueryTag, currPage],
    queryFn: async () =>
      getAllArticles({
        folderId: null,
        page: currPage,
        limit: 9,
        tag: searchQueryTag,
      }),
  });

  return (
    <main className="mx-auto w-full">
      {/* tag header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-4 px-8 lg:mb-4">
        <ToolTipText
          className="line-clamp-2 font-thin"
          text="Back"
          child={
            <ArrowLeftIcon
              className="h-6 w-6 hover:cursor-pointer"
              onClick={() => navigate(-1)}
            />
          }
        />
        <div className="text-2xl font-semibold">
          {searchQueryTag}
          {articles && articles?.bookmarks.total_records > 0 && (
            <span> {`(${articles.bookmarks.total_records})`} </span>
          )}
        </div>
      </div>

      {/* article grid (gallery mode) */}
      {mode === "gallery" && (
        <div className="mb-12 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
          {/* loading */}
          {isLoading && <ArticleSkeleton numCards={6} />}

          {/* show articles */}
          {articles &&
            articles.bookmarks.data &&
            articles.bookmarks.data.map((article) => {
              return <Article key={article._id} article={article} />;
            })}
        </div>
      )}

      {/* article list (list mode) */}
      {mode === "list" && (
        <div className="mb-12 gap-4 px-8">
          {/* loading */}
          {isLoading && <ArticleSkeletonList numCards={5} />}

          {/* show articles */}
          {articles && articles.bookmarks.data && (
            <div className="flex flex-col gap-3">
              {articles.bookmarks.data.map((article, index) => {
                return <ArticleList key={index} article={article} />;
              })}
            </div>
          )}
        </div>
      )}

      {/* if empty */}
      {articles?.bookmarks.total_records === 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-md scroll-m-20">Oops, no links found </h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4" />
            <span> Back </span>
          </Button>
        </div>
      )}

      {/* pagination */}
      <div className="bottom-0 mb-10">
        <ArticlePagination
          currentPage={currPage}
          setPage={setCurrPage}
          recordsPerPage={9}
          totalRecords={articles?.bookmarks.total_records || 0}
        />
      </div>
    </main>
  );
};
export default TagSaves;
