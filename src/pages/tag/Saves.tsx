import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/api/articles";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import Articles from "@/components/Articles";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import ToolTipText from "@/components/TooltipText";

const TagSaves = () => {
  const [currPage, setCurrPage] = useState(1);

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
    queryKey: ["get-all-articles", searchQueryTag, currPage],
    queryFn: async () => getAllArticles(currPage, 9, searchQueryTag),
  });

  return (
    <main className="container mx-auto">
      {/* tag header */}
      <div className="mb-4 flex flex-row items-center justify-start gap-4 px-8 lg:mb-4">
        <ToolTipText
          className="line-clamp-2 font-thin"
          text="Back"
          child={
            <ArrowLeftIcon
              className="h-6 w-6 hover:cursor-pointer"
              onClick={() => navigate("/tags")}
            />
          }
        />
        <div className="text-2xl font-semibold">
          {searchQueryTag}
          {articles && articles?.total_records > 0 && (
            <span> {`(${articles.total_records})`} </span>
          )}
        </div>
      </div>

      {/* is loading */}
      {isLoading && (
        <div className="mb-12 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
          {/* loading */}
          {<ArticleSkeleton numCards={6} />}
        </div>
      )}

      {/* if empty */}
      {articles?.total_records === 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-md scroll-m-20">Oops, no links found </h1>
          <Button onClick={() => navigate("/tags")}>
            <ArrowLeftIcon className="h-4 w-4" />
            <span> Back </span>
          </Button>
        </div>
      )}

      {/* articles  */}
      {articles && articles?.total_records >= 0 && (
        <div className="mb-12 grid grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3">
          {/* show articles */}
          {articles && <Articles articles={articles.data} />}
        </div>
      )}

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
export default TagSaves;
