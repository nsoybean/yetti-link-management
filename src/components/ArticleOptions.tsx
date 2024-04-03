import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DotsVerticalIcon,
  BookmarkIcon,
  CopyIcon,
  CheckboxIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archiveArticle,
  deleteArticle,
  unarchiveArticle,
} from "@/api/articles";
import toast from "react-hot-toast";
import { Article } from "@/typings/article/Article";
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

type Props = {
  article: Article;
};

const ArticleOptions = ({ article }: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [tagDialogOpen, setTagDialogOpen] = useState<boolean>(false);
  const [currToast, setCurrToast] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  // const [newTag, setNewTag] = useState<string>("");
  const queryClient = useQueryClient();
  const tagInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("🚀 ~ ArticleOptions ~ tagList:", tagList);
  }, [tagList]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  const onKeyPress = async (event: KeyboardEvent) => {
    // Check if the 'enter key' key is pressed and the focus is on the input
    // if (
    //   event.key === "Enter" &&
    //   document.activeElement === tagInputRef.current
    // ) {
    //   if (tagInputRef.current) {
    //     event.preventDefault();
    //     upsertTagValue(tagInputRef.current.value);
    //   }
    // }
  };

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

  const { mutate: archiveArticleById } = useMutation({
    mutationFn: archiveArticle,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Link archived!");

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

  const { mutate: unarchiveArticleById } = useMutation({
    mutationFn: unarchiveArticle,
    onSuccess: (data) => {
      toast.success("Link restored!");
    },
    onError: (error) => {
      alert(`Error`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-archived-articles"],
      });
    },
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
    deleteArticleById({ id: article.id });
  }

  async function toggleTagDialog() {
    setTagDialogOpen((prev) => !prev);
    setTagList([]);
    if (tagInputRef.current) {
      tagInputRef.current.value = "";
    }
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

    if (!tagList.includes(trimmedTag)) {
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
  return (
    <>
      {/* setting modal to false, prevent drop down from remaining open */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-full">
            <DotsVerticalIcon width={"18"} height={"18"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-red-600"
              onSelect={(e) => e.preventDefault()}
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon width={"18"} height={"18"} className="mr-2" />
              Delete
              {/* <DropdownMenuShortcut>⌘ ⌫</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyTextToClipboard(article.link)}>
              <CopyIcon width={"18"} height={"18"} className="mr-2" /> Copy
            </DropdownMenuItem>
            {article.state === "AVAILABLE" && (
              <DropdownMenuItem onClick={() => toggleTagDialog()}>
                <BookmarkIcon width={"18"} height={"18"} className="mr-2" /> Tag
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                if (article.state === "AVAILABLE") {
                  const toastId = toast.loading("Archiving...");
                  setCurrToast(toastId);
                  archiveArticleById({ id: article.id });
                } else {
                  const toastId = toast.loading("Restoring...");
                  setCurrToast(toastId);
                  unarchiveArticleById({ id: article.id });
                }
              }}
            >
              <CheckboxIcon width={"18"} height={"18"} className="mr-2" />
              {article.state === "AVAILABLE" ? "Archive" : "Restore"}
            </DropdownMenuItem>

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
        description="This action cannot be undone. This will delete the article."
      />

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
              variant={"secondary"}
              className="px-3"
              onClick={() => {
                if (tagInputRef.current) {
                  upsertTagValue(tagInputRef.current.value);
                }
              }}
            >
              <span className="sr-only">Copy</span>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  return console.log("saving tag list:", tagList);
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticleOptions;
