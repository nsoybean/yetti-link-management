import { useEffect, useRef, useState } from "react";
import { parseAuthFromRedirectUrl } from "@/lib/auth";
import { setAuthToken } from "@/configs/auth";
import { useQuery } from "@tanstack/react-query";
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
import blankSlateContent from "/blankSlateContent.svg";
import Articles from "@/components/Articles";
import { Input } from "@/components/ui/input";

const Tag = () => {
  const [currPage, setCurrPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery({
    queryKey: ["get-all-archived-articles", currPage],
    queryFn: async () => getAllArchivedArticles(currPage),
  });

  return (
    <div className="mx-auto w-full">
      {/* article grid */}
      <div className="mb-12 gap-4 px-8">
        {/* loading */}

        {/* {isLoading && <ArticleSkeleton numCards={6} />} */}
        <div className="mb-4 text-2xl font-semibold lg:mb-6"> All tags </div>

        <Input
          className="p-6"
          ref={inputRef}
          placeholder="Search for your tags"
          autoFocus={true}
        />
        {/* show articles */}
        {/* {articles && <Articles articles={articles.data} />} */}
      </div>

      {/* pagination */}
      {/* <div className="bottom-0 mb-10">
        <ArticlePagination
          currentPage={currPage}
          setPage={setCurrPage}
          recordsPerPage={9}
          totalRecords={articles?.total_records || 0}
        />
      </div> */}
    </div>
  );
};

export default Tag;
