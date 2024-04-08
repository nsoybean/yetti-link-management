import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/api/articles";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import Articles from "@/components/Articles";
import { useNavigate } from "react-router-dom";

const TagSaves = () => {
  const [currPage, setCurrPage] = useState(1);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get("tag");
  const searchQueryTag = paramValue?.split(",")[0];
  const navigate = useNavigate();

  // head back to main saves page, if no query tag found
  if (!searchQueryTag) {
    navigate("/saves");
  }

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery({
    queryKey: ["get-all-articles", currPage],
    queryFn: async () => getAllArticles(currPage, 9, searchQueryTag),
  });

  return (
    <main className="mx-auto w-full">
      {/* tag header */}
      <div className="gap-4 px-8">
        <div className="mb-4 text-2xl font-semibold lg:mb-4">
          {searchQueryTag}
          {articles?.total_records && <span> ({articles.total_records}) </span>}
        </div>

        {/* article grid */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* loading */}
          {isLoading && <ArticleSkeleton numCards={6} />}

          {/* show articles */}
          {articles && <Articles articles={articles.data} />}
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
    </main>
  );
};

export default TagSaves;
