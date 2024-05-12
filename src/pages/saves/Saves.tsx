import { useEffect, useState } from "react";
import { parseAuthFromRedirectUrl } from "@/lib/auth";
import { setAuthToken } from "@/configs/auth";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles, getAllSaves } from "@/api/articles";
import { Button } from "@/components/ui/button";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { PlusIcon } from "@radix-ui/react-icons";
import { SaveArticleInput } from "@/components/SaveArticleInput";
import yetti from "/cuteCreativeYeti.jpeg";
import Articles from "@/components/Articles";
import toast from "react-hot-toast";
import { useViewArticleMode } from "@/hooks/useArticleViewMode";
import ArticlesList from "@/components/ArticlesList";
import ArticleSkeletonList from "@/components/ArticleSkeletonList";
import Folders from "@/components/Folders";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
// import { DataTable } from "@/components/articleTable/data-table";
// import { ArticleColumns } from "@/components/articleTable/columns";

const Saves = () => {
  const [currPage, setCurrPage] = useState(1);
  const { mode } = useViewArticleMode();
  // get param from url
  const { folderId } = useParams();

  useEffect(() => {
    // temp: remove old storage items
    localStorage.removeItem("leaf:color-theme");
    localStorage.removeItem("leaf-ui-theme");
    localStorage.removeItem("leaf-ui-theme");
    localStorage.removeItem("leaf:authToken");

    // parse token and save in storage after SSO redirect
    const url = window.location.href;
    if (url.includes("access_token")) {
      const userAuth = parseAuthFromRedirectUrl(url);

      if (userAuth.accessToken) {
        setAuthToken(userAuth.accessToken);
        // clear local window url
        window.history.replaceState("", "", "/saves");
      } else {
        toast.error("Failed authentication");
      }
    }
  }, []);

  // scroll to top of page every page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery({
    queryKey: ["get-all-articles", currPage, folderId],
    // queryFn: async () => getAllArticles(currPage), // deprecated
    queryFn: async () =>
      getAllSaves({ folderId: folderId || null, page: currPage, limit: 9 }),
  });

  const handleScroll = () => {
    const buffer = 25; // Adjust this value as needed. To account for desktop bookmark bar etc which is not included in window innerheight.
    if (
      window.innerHeight + document.documentElement.scrollTop + buffer <=
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    // fetchData();
    console.log("fetching data...");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  // empty
  if (!isLoading && articles?.bookmarks.total_records === 0) {
    return (
      <div className="container mx-auto flex justify-center py-16">
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
      {/* article grid (gallery mode) */}
      {mode === "gallery" && (
        <div className="flex flex-col gap-5">
          <div className="text-lg font-semibold"> Saves </div>
          <Separator />
          {/* is loading */}
          {isLoading && (
            <div className="mb-12 flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ArticleSkeleton numCards={6} />
              </div>
            </div>
          )}

          {/* folder */}
          {articles?.folders?.data && articles?.folders?.data.length > 0 && (
            <div className="my-1 flex flex-col gap-2">
              {/* <h4> Folders</h4> */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Folders folders={articles.folders.data} />
              </div>
            </div>
          )}

          {/* articles */}
          {articles?.bookmarks?.data && articles.bookmarks.data.length > 0 && (
            <div className="mb-12 flex flex-col gap-2">
              {/* <h4> Saves</h4> */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {articles && <Articles articles={articles.bookmarks.data} />}
              </div>
            </div>
          )}
        </div>
      )}

      {/* article list (list mode) */}
      {mode === "list" && (
        <div className="mb-12 gap-4 px-8">
          {/* loading */}
          {isLoading && <ArticleSkeletonList numCards={5} />}

          {/* show articles */}
          {articles && <ArticlesList articles={articles.bookmarks.data} />}
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

export default Saves;
