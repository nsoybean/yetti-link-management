import { useEffect, useState } from "react";
import { parseAuthFromRedirectUrl } from "@/lib/auth";
import { setAuthToken } from "@/configs/auth";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/api/articles";
import { Button } from "@/components/ui/button";
import ArticlePagination from "@/components/ArticlePagination";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { SaveArticleInput } from "@/components/SaveArticleInput";
import yetti from "/cuteCreativeYeti.jpeg";
import Articles from "@/components/Articles";
import toast from "react-hot-toast";
import { useViewArticleMode } from "@/hooks/useArticleViewMode";
import ArticlesList from "@/components/ArticlesList";
import ArticleSkeletonList from "@/components/ArticleSkeletonList";
import useLogout from "@/hooks/useLogout";
import { storage } from "@/lib/storage";
import Folders from "@/components/Folders";
import { Separator } from "@/components/ui/separator";
import { Folder, IParentFolderHierarchy } from "@/typings/folder/type";
import AddNew from "@/components/AddNew";
import { ROOT_FOLDER__VALUE, useFolder } from "@/hooks/FolderProvider";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleStateEnum } from "@/typings/article/type";
import {
  ChevronRight,
  CircleEllipsisIcon,
  FolderIcon,
  LucideArrowRight,
  ShieldEllipsis,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { DataTable } from "@/components/articleTable/data-table";
// import { ArticleColumns } from "@/components/articleTable/columns";

type Props = {
  state?: ArticleStateEnum;
};

const Saves = ({ state: articleState = ArticleStateEnum.AVAILABLE }: Props) => {
  const [currPage, setCurrPage] = useState(1);
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [isFolderEllipseOpen, setIsFolderEllipseOpen] = useState(false);
  const { mode } = useViewArticleMode();
  const { logout } = useLogout();
  const { folderId } = useParams();
  const { setFolder } = useFolder();
  const navigate = useNavigate();

  // update folder id context
  let currFolderId = folderId || ROOT_FOLDER__VALUE;
  useEffect(() => {
    if (folderId) {
      setFolder(folderId);
    } else {
      setFolder(ROOT_FOLDER__VALUE);
    }
  }, [folderId]);

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
        // set login during first login
        storage.set("login001", "true");
        // clear local window url
        window.history.replaceState("", "", "/saves");
      } else {
        toast.error("Failed authentication");
      }
    }

    // force users with old session to log out
    // wont affect users with new login as key is set above after login
    const login_001 = storage.get("login001");
    if (!login_001) {
      storage.set("login001", "true");
      logout();
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
    queryFn: async () =>
      getAllArticles({
        folderId: currFolderId,
        page: currPage,
        limit: 9,
      }),
  });

  // filter away current folder from list, if any
  let filteredFolders: Folder[] = [];
  if (articles) {
    filteredFolders = articles.folders.data.filter(
      (folder) => folder._id !== currFolderId,
    );
  }

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
    // TODO @sb: implement infinite scroll
    // console.log("fetching data...");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  function renderEmptyArticlesState() {
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
              setIsOpen={setIsAddLinkDialogOpen}
              isOpen={isAddLinkDialogOpen}
              onEventListener={false}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * navigates to folderId path if current path is not on folderId
   * @param folderId
   */
  function navigateToFolder({ id }: { id: string }) {
    if (!id) {
      return;
    }

    if (folderId !== id) {
      navigate(`/saves/folder/${id}`);
    }
  }

  /**
   * @returns folder breadcrumbs
   * eg. saves > folder_1
   * saves > folder_1 > folder_2
   * saves > ... > folder_2  > folder_3. "..." shows max 4 levels of parent folder
   */
  function renderFolderHierarchy({
    parentFolderHierarchy,
  }: {
    parentFolderHierarchy: {
      maxDepthLookupReached: boolean;
      list: {
        _id: string;
        name: string;
      }[];
    };
  }) {
    let reversedParentToChildFolder: {
      _id: string;
      name: string;
    }[] = parentFolderHierarchy.list.map(
      (item, idx) =>
        parentFolderHierarchy.list[parentFolderHierarchy.list.length - 1 - idx],
    );

    // case 1. if less than 2 levels, render all
    // saves > folder_1 > folder_2
    if (reversedParentToChildFolder.length <= 2) {
      return (
        <div className="flex flex-row items-center gap-2">
          <div
            className="ml-2 rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
            onClick={() => {
              navigate("/saves");
            }}
          >
            Saves
          </div>
          {reversedParentToChildFolder.map((folder, index) => {
            return (
              <div key={index} className="flex flex-row items-center">
                <ChevronRight />
                <span
                  className="ml-2 rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
                  onClick={() => {
                    navigateToFolder({ id: folder._id });
                  }}
                >
                  {folder.name}
                </span>
              </div>
            );
          })}
        </div>
      );
    } else if (reversedParentToChildFolder.length > 2) {
      // case 2: if more than 2 levels and max depth not reached, render dropdown with last 2
      // ... > folder_2 > folder_3
      let ellipseList = reversedParentToChildFolder.slice(0, -2); // first to third last element
      let shownList = reversedParentToChildFolder.slice(-2); // last 2 element
      return (
        <div className="flex flex-row items-center gap-2">
          <div className="ml-2 text-xl font-semibold">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="rounded-full p-2 hover:cursor-pointer hover:bg-accent">
                  <DotsHorizontalIcon height={18} width={18} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuGroup>
                  {/* fixed (/saves) */}
                  <DropdownMenuItem
                    className="gap-2"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      navigate("/saves");
                    }}
                  >
                    <FolderIcon width={18} height={18} />
                    Saves
                  </DropdownMenuItem>
                  {/* if hit max depth */}
                  {parentFolderHierarchy.maxDepthLookupReached && (
                    <DropdownMenuItem
                      disabled={true}
                      className="gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <DotsVerticalIcon width={18} height={18} />
                    </DropdownMenuItem>
                  )}
                  {/* case 3: if more than 2 levels and max depth reached, render collapse ellipse within dropdown */}
                  {ellipseList.map((folder, index) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        className="gap-2"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => {
                          navigateToFolder({ id: folder._id });
                        }}
                      >
                        <FolderIcon width={18} height={18} />
                        {folder.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {shownList.map((folder, index) => {
            return (
              <div key={index} className="flex flex-row items-center">
                <ChevronRight />
                <span
                  className="ml-2 rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
                  onClick={() => {
                    navigateToFolder({ id: folder._id });
                  }}
                >
                  {folder.name}
                </span>
              </div>
            );
          })}
        </div>
      );

      // if max depth reached, parent folder hierarchy will only show X levels.
      // any folders higher in the hierarchy will be hidden
      return (
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">...</span>
        </div>
      );
    }

    // base
    <div className="ml-2 text-xl font-semibold"> Saves </div>;
  }

  return (
    // main
    <main className="mx-auto w-full">
      <div className="flex flex-col gap-3">
        {/* header */}
        <div className="mt-2 flex flex-row items-center justify-between">
          {articles?.parentFolderHierarchy ? (
            renderFolderHierarchy({
              parentFolderHierarchy: articles?.parentFolderHierarchy,
            })
          ) : (
            // base, no hierarchy
            <div className="ml-2 text-xl font-semibold"> Saves </div>
          )}
          <AddNew
            trigger={
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                New
              </Button>
            }
          />
        </div>

        {/* divider */}
        <Separator />

        {/* content (gallery mode) */}
        {mode === "gallery" && (
          <div className="">
            {/* is loading */}
            {isLoading && (
              <div className="mb-12 flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <ArticleSkeleton numCards={6} />
                </div>
              </div>
            )}

            {/* folder */}
            {filteredFolders.length > 0 && (
              <div className="mb-8 mt-1">
                <h2 className="mb-1 ml-2"> Folders </h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <Folders folders={filteredFolders} />
                </div>
              </div>
            )}

            {/* articles */}
            {articles?.bookmarks?.data &&
              articles.bookmarks.data.length > 0 && (
                <div className="">
                  <h2 className="mb-1 ml-2"> Links </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Articles articles={articles.bookmarks.data} />
                  </div>
                </div>
              )}

            {/* articles (empty state) */}
            {articles?.bookmarks?.data &&
              articles.bookmarks.total_records === 0 &&
              renderEmptyArticlesState()}
          </div>
        )}

        {/* content (list mode) */}
        {mode === "list" && (
          <div className="">
            {/* is loading */}
            {isLoading && <ArticleSkeletonList numCards={5} />}

            {/* folder */}
            {filteredFolders.length > 0 && (
              <div className="mb-8 mt-1">
                <h2 className="ml-2 font-bold"> Folders </h2>
                <Folders folders={filteredFolders} />
              </div>
            )}

            {/* articles */}
            {articles?.bookmarks?.data &&
              articles.bookmarks.data.length > 0 && (
                <div className="">
                  <h2 className="ml-2 font-bold">Links </h2>
                  <ArticlesList articles={articles.bookmarks.data} />
                </div>
              )}

            {/* articles (empty state) */}
            {articles?.bookmarks?.data &&
              articles.bookmarks.total_records === 0 &&
              renderEmptyArticlesState()}
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="bottom-0 mb-10 mt-12">
        <ArticlePagination
          currentPage={currPage}
          setPage={setCurrPage}
          recordsPerPage={9}
          totalRecords={articles?.bookmarks.total_records || 0}
        />
      </div>

      {/* {isFolderEllipseOpen && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-[35px] w-[35px] rounded-full hover:bg-slate-200"
            >
              <DotsVerticalIcon width={"16"} height={"16"} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-red-600"
                onSelect={(e) => e.preventDefault()}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <TrashIcon width={"18"} height={"18"} className="mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => toggleRenameDialog()}
              >
                <Pencil1Icon width={"18"} height={"18"} className="mr-2" />{" "}
                Rename
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )} */}
    </main>
  );
};

export default Saves;
