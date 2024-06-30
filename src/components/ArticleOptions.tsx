import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DotsVerticalIcon,
  CopyIcon,
  Cross2Icon,
  Pencil1Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  ChevronRight,
  FolderIcon,
  FolderInputIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  archiveArticle,
  deleteArticle,
  moveBookmarksToFolder,
  tagArticle,
  unarchiveArticle,
  updateArticleMetaById,
} from "@/api/articles";
import toast from "react-hot-toast";
import { Article } from "@/typings/article/type";
import { useEffect, useRef, useState } from "react";
import ConfirmationDialog from "./Dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { AxiosError } from "axios";
import { Separator } from "./ui/separator";
import { getNestedFoldersById } from "@/api/folders";
import { useFolder } from "@/hooks/FolderProvider";
import { Skeleton } from "./ui/skeleton";
import { Folder } from "@/typings/folder/type";

type Props = {
  article: Article;
};

function didTagsChange(array1: string[], array2: string[]) {
  // Check if the lengths of both arrays are the same
  if (array1.length !== array2.length) {
    return true;
  }

  // Sort both arrays based on the 'name' property
  const sortedArray1 = array1.slice().sort((a, b) => a.localeCompare(b));
  const sortedArray2 = array2.slice().sort((a, b) => a.localeCompare(b));

  // Iterate through both sorted arrays and compare the 'name' property of each object
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return true;
    }
  }

  // If all comparisons passed, the arrays are equal
  return false;
}

const ArticleOptions = ({ article }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [tagDialogOpen, setTagDialogOpen] = useState<boolean>(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [moveFilesDialogOpen, setMoveFilesDialogOpen] =
    useState<boolean>(false);
  const [currToast, setCurrToast] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [articleMetaData, setArticleMetaData] = useState<{
    title: string;
  } | null>(null);
  const [moveFolderCurrId, setMoveFolderCurrId] = useState<string | null>(null);
  const [isGetNestedFolderLoading, setIsGetgetNestedFolderLoading] =
    useState(false);
  const [nestedFolders, setNestedFolders] = useState<Folder[]>([]);
  const [parentFoldersHierarchy, setParentFoldersHierarchy] = useState<{
    maxDepthLookupReached: boolean;
    list: { _id: string; name: string }[];
  } | null>(null);

  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const { folder: currFolderId } = useFolder();

  // copy of original tags
  let originalTags: string[] = [];
  if (article?.tags) {
    originalTags = article?.tags.map((tag) => tag.name);
  }

  // if user open add tags dialog, load current tags into state
  useEffect(() => {
    if (article && article?.tags) {
      setTagList(article?.tags.map((tag) => tag.name));
    }
  }, [tagDialogOpen]);

  /**
   * if move folder is set
   */
  useEffect(() => {
    if (moveFolderCurrId) {
      navigateMoveFolderDir(moveFolderCurrId);
    }
  }, [moveFolderCurrId]);

  async function navigateMoveFolderDir(folderId: string) {
    try {
      setIsGetgetNestedFolderLoading(true);
      const res = await getNestedFoldersById({ id: folderId });

      if (res.folders) {
        setNestedFolders(res.folders.data);
      }

      if (res.parentFolderHierarchy) {
        setParentFoldersHierarchy(res.parentFolderHierarchy);
      } else if (folderId === "root") {
        setParentFoldersHierarchy(null);
      }
    } catch (error) {
      toast.error("Failed to get folder data. Please try again.");
    } finally {
      setIsGetgetNestedFolderLoading(false);
    }
  }
  // delete article
  const { mutate: deleteArticleById } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link deleted!");

      // invalidate query
      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-all-archived-articles"],
        });
      }
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  // move article
  const { mutate: moveArticlesToFolder } = useMutation({
    mutationFn: moveBookmarksToFolder,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Successfully moved!");

      // invalidate query
      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      }
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  // archive article
  const { mutate: archiveArticleById } = useMutation({
    mutationFn: archiveArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link archived!");

      // invalidate query
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["get-all-archived-articles"],
      });
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  // unarchive
  const { mutate: unarchiveArticleById } = useMutation({
    mutationFn: unarchiveArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link restored!");
    },
    onError: (error) => {
      alert(`Error`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["get-all-archived-articles"],
      });
    },
  });

  // adding tags
  const { mutate: tagArticleById } = useMutation({
    mutationFn: tagArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Tags saved!");

      // invalidate query
      queryClient.invalidateQueries({
        queryKey: ["get-all-tags"],
      });

      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({
          queryKey: ["get-all-articles"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-all-archived-articles"],
        });
      }
    },
    onError: (error) => {
      if (
        error instanceof AxiosError &&
        error.response?.data?.statusCode === 400 // bad request
      ) {
        toast.dismiss(currToast);
        toast.error(`${error.response?.data?.message}`);
        return;
      }
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  // updating metadata (title)
  const { mutate: updateArticle } = useMutation({
    mutationFn: updateArticleMetaById,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Updated!");

      // invalidate query
      if (article.state === "AVAILABLE") {
        queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["get-all-archived-articles"],
        });
      }
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  async function copyTextToClipboard(link: string) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied!");
    }
  }

  async function menuItemSelect() {
    const toastId = toast.loading("Deleting...");
    setCurrToast(toastId);
    deleteArticleById({ id: article._id });
  }

  async function toggleTagDialog() {
    setTagDialogOpen((prev) => !prev);
    setTagList([]);
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
    }
  }

  async function toggleRenameDialog() {
    setRenameDialogOpen((prev) => !prev);
  }

  async function toggleMoveFilesDialog() {
    setMoveFilesDialogOpen((prev) => !prev);
    // reset
    setMoveFolderCurrId(null);
  }

  function upsertTagValue(tag: string) {
    const trimmedTag = tag.trim();

    // alert if more than limit
    if (tagList.length >= 5) {
      toast.error("Maximum 5 tags");
      return;
    }

    // reset if empty space
    if (trimmedTag === "") {
      if (tagInputRef.current) {
        tagInputRef.current.value = "";
      }
      return;
    }

    if (!tagList.some((tag) => tag === trimmedTag)) {
      // create deep copy of array and set state
      const newTagList = [...tagList];
      newTagList.push(trimmedTag);
      setTagList(newTagList);
    }

    // reset
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
      tagInputRef.current.focus();
    }
  }

  function removeTagByIndex(index: number) {
    const newTagList = tagList.filter((_, i) => i !== index);
    setTagList(newTagList);
  }

  function renderFolderHierarchyBreadCrumb({
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

    // is loading
    if (isGetNestedFolderLoading) {
      return (
        <div className="flex flex-col items-start gap-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
      );
    }

    // case 1. if less than 2 levels, render all
    // saves > folder_1 > folder_2
    if (reversedParentToChildFolder.length <= 2) {
      return (
        <div className="flex flex-row items-center gap-2">
          <div
            className={`rounded-md px-2 py-1 text-sm font-medium ${moveFolderCurrId !== "root" && "opacity-50 hover:cursor-pointer hover:underline"}`}
            onClick={() => {
              setMoveFolderCurrId("root"); // root
            }}
          >
            Saves
          </div>
          {reversedParentToChildFolder.map((folder, index) => {
            return (
              <div key={index} className="flex flex-row items-center">
                <ChevronRight />
                <span
                  className={`rounded-md px-2 py-1 text-sm font-medium ${moveFolderCurrId !== folder._id && "opacity-50 hover:cursor-pointer hover:underline"}`}
                  onClick={() => {
                    setMoveFolderCurrId(folder._id);
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
          <div className="text-sm font-medium">
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
                      setMoveFolderCurrId("root");
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
                          setMoveFolderCurrId(folder._id);
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
                  className={`rounded-md px-2 py-1 text-sm font-medium ${moveFolderCurrId !== folder._id && "opacity-50 hover:cursor-pointer hover:underline"}`}
                  onClick={() => {
                    setMoveFolderCurrId(folder._id);
                  }}
                >
                  {folder.name}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    // base
    <div className="ml-2 text-sm font-medium"> Saves </div>;
  }

  return (
    <>
      {/* setting modal=false, prevent drop down from remaining open */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-full">
            <DotsVerticalIcon width={"18"} height={"18"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => copyTextToClipboard(article.link)}>
              <CopyIcon width={"18"} height={"18"} className="mr-2" /> Copy link
            </DropdownMenuItem>
            {article.state === "AVAILABLE" && (
              <DropdownMenuItem onClick={() => toggleTagDialog()}>
                <TagIcon width={"18"} height={"18"} className="mr-2" /> Tag
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={() => {
                toggleMoveFilesDialog();

                // update useState array
                setSelectedBookmarks((prev) => [...prev, ...[article._id]]);
                setMoveFolderCurrId(currFolderId);
              }}
            >
              <FolderInputIcon width={"18"} height={"18"} className="mr-2" />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={() => toggleRenameDialog()}
            >
              <Pencil1Icon width={"18"} height={"18"} className="mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onSelect={(e) => e.preventDefault()}
              onClick={() => setOpenDialog(true)}
            >
              <TrashIcon width={"18"} height={"18"} className="mr-2" />
              Delete
            </DropdownMenuItem>
            {/* temp commented out archive feature */}
            {/* <DropdownMenuItem
              onClick={() => {
                if (article.state === "AVAILABLE") {
                  const toastId = toast.loading("Archiving...");
                  setCurrToast(toastId);
                  archiveArticleById({ id: article._id });
                } else {
                  const toastId = toast.loading("Restoring...");
                  setCurrToast(toastId);
                  unarchiveArticleById({ id: article._id });
                }
              }}
            >
              <ArchiveIcon width={"18"} height={"18"} className="mr-2" />
              {article.state === "AVAILABLE" ? "Archive" : "Restore"}
            </DropdownMenuItem> */}

            {/* temp commented out till implemented */}
            {/* <DropdownMenuItem>
              <StarIcon width={"18"} height={"18"} className="mr-2" /> Favourite
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator />
          <DropdownMenuItem>
          <ReaderIcon width={"18"} height={"18"} className="mr-2" />
          Add notes
        </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* alert dialog */}
      <ConfirmationDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        cb={menuItemSelect}
        title="Are you sure?"
        description="This action cannot be undone. This will delete the link."
      />

      {/* add tags dialog */}
      <Dialog onOpenChange={toggleTagDialog} open={tagDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Tags</DialogTitle>
            <DialogDescription>
              They help you to find your articles more easily
            </DialogDescription>
          </DialogHeader>

          {/* tags */}
          {/* render tag as badge */}
          {tagList && tagList.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag, index) => (
                <Badge key={index} className="max-w-24" variant={"secondary"}>
                  <p className="overflow-hidden truncate"> {tag}</p>
                  <Cross2Icon
                    onClick={() => {
                      removeTagByIndex(index);
                    }}
                    className="ml-2 h-4 w-4 flex-shrink-0 hover:cursor-pointer"
                  />
                </Badge>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only">Link</Label>
              <Input
                ref={tagInputRef}
                // value={() => {
                //   (function () {
                //     if (tagInputRef.current) {
                //       return tagInputRef.current.value;
                //     }
                //     return "hi";
                //   })();
                // }}
                // onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              variant={"default"}
              className="px-3"
              onClick={() => {
                if (tagInputRef.current) {
                  upsertTagValue(tagInputRef.current.value);
                }
              }}
            >
              <span className="sr-only">Add tag</span>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant={
                  didTagsChange(originalTags, tagList) ? "default" : "secondary"
                }
                disabled={!didTagsChange(originalTags, tagList)}
                onClick={() => {
                  tagArticleById({ id: article._id, tags: tagList });
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* rename dialog */}
      <Dialog onOpenChange={toggleRenameDialog} open={renameDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Link</DialogTitle>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only">Link</Label>
              <Input
                defaultValue={article.title}
                onChange={(e) =>
                  setArticleMetaData({ title: e.target.value.trim() })
                }
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant={"default"}
                disabled={
                  !articleMetaData?.title ||
                  articleMetaData?.title === article?.title
                }
                onClick={() => {
                  if (articleMetaData?.title) {
                    updateArticle({
                      id: article._id,
                      title: articleMetaData?.title,
                    });
                  }
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* move files dialog */}
      <Dialog onOpenChange={toggleMoveFilesDialog} open={moveFilesDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Move item</DialogTitle>
            <DialogDescription>Select a destination folder</DialogDescription>
          </DialogHeader>

          {/* folders list */}
          {/* <Separator /> */}
          <div className="border-t border-gray-300"></div>

          {/* main */}
          <div className="flex h-28 w-full flex-col overflow-y-auto">
            {/* loading */}
            {isGetNestedFolderLoading && (
              <div className="flex flex-col items-start gap-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}

            {/* show nested folders */}
            {!isGetNestedFolderLoading &&
              nestedFolders &&
              nestedFolders.length > 0 && (
                <div className="flex w-full flex-col items-start gap-2">
                  {nestedFolders.map((folder) => {
                    // hide current folder
                    if (folder._id === moveFolderCurrId) {
                      return;
                    }

                    return (
                      <div
                        key={folder._id}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setMoveFolderCurrId(folder._id);
                        }}
                      >
                        <FolderIcon width={18} height={18} />
                        <p className="max-w-36 truncate">{folder.name}</p>
                      </div>
                    );
                  })}
                </div>
              )}

            {/* empty message */}
            {!isGetNestedFolderLoading &&
              (nestedFolders.length === 0 ||
                (nestedFolders?.length === 1 &&
                  nestedFolders[0]?._id === moveFolderCurrId)) && (
                <div className="opacity-50">No folders available.</div>
              )}
          </div>

          {/* folder hierarchy breadcrumb */}
          {parentFoldersHierarchy &&
            renderFolderHierarchyBreadCrumb({
              parentFolderHierarchy: parentFoldersHierarchy,
            })}

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild onChange={() => console.log("changing")}>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant={"default"}
              isLoading={isGetNestedFolderLoading}
              disabled={
                currFolderId === moveFolderCurrId || isGetNestedFolderLoading
                  ? true
                  : false
              }
              onClick={() => {
                if (!moveFolderCurrId) {
                  return;
                } else {
                  const toastId = toast.loading("Moving links...");
                  setCurrToast(toastId);
                  moveArticlesToFolder({
                    bookmarkIds: selectedBookmarks,
                    folderId: moveFolderCurrId,
                  });
                  toggleMoveFilesDialog();
                }
              }}
            >
              Move here
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleOptions;
