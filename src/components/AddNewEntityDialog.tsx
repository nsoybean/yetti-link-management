import React, { useEffect, useRef, useState } from "react";
import { FolderPlusIcon, ForwardIcon, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
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
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFolder } from "@/hooks/FolderProvider";
import toast from "react-hot-toast";
import { addArticle } from "@/api/articles";
import { AxiosError } from "axios";
import { createFolder } from "@/api/folders";

type Props = {
  trigger: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewEntityDialog = (props: Props) => {
  const [selectedEntity, setSelectedEntity] = useState<
    "link" | "folder" | null
  >(null);

  const [entityInput, setEntityInput] = useState("");
  const [currToast, setCurrToast] = useState("");
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { folder: currFolderId } = useFolder();

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [selectedEntity]);

  const { mutate: mutateLink, status: mutateLinkStatus } = useMutation({
    mutationFn: addArticle,
    onSuccess: (data) => {
      props.setIsOpen(false);
      if (inputRef?.current) {
        inputRef.current.blur();
      }
      toast.dismiss(currToast);
      toast.success("Link Added!");
      setEntityInput("");
    },

    onError: (error) => {
      let axiosError = error as AxiosError;
      toast.dismiss(currToast);
      if (axiosError.response?.status === 422) {
        toast.error(`Invalid link`);
      } else {
        toast.error(`Error!`);
      }
      setEntityInput("");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
    },
  });

  const { mutate: mutateFolder, status: mutateFolderStatus } = useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      props.setIsOpen(false);
      if (inputRef?.current) {
        inputRef.current.blur();
      }
      toast.dismiss(currToast);
      toast.success("Folder created!");
      setEntityInput("");
    },

    onError: (error) => {
      let axiosError = error as AxiosError<{ message: string }>;
      toast.dismiss(currToast);
      toast.error(`Error! ${axiosError.response?.data.message}`);
      setEntityInput("");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-articles"],
      });
    },
  });

  const onKeyPress = async (event: KeyboardEvent) => {
    // Check if the 'esp key' key is pressed
    if (event.key === "Escape") {
      // remove focus and clear input
      if (inputRef.current) {
        setEntityInput("");
        inputRef.current.blur();
      }
    }

    // Check if the 'enter key' key is pressed and the focus is on the input
    if (event.key === "Enter" && document.activeElement === inputRef.current) {
      if (inputRef.current) {
        if (selectedEntity === "link") {
          saveArticle(inputRef.current.value);
        } else if (selectedEntity === "folder") {
          createFolderWithName({ name: inputRef.current.value });
        } else {
          toast.error("Oops. Not sure what you want to create.");
        }
      }
    }
  };

  async function createFolderWithName({ name }: { name: string }) {
    if (!currFolderId) {
      toast.error("Current folder unknown");
      return;
    }

    if (name.trim() !== "") {
      const toastId = toast.loading("Creating...");
      setCurrToast(toastId);
      mutateFolder({ parentFolderId: currFolderId, folderName: name.trim() });
    }
  }

  async function saveArticle(inputUrl: string) {
    if (!currFolderId) {
      toast.error("Current folder unknown");
      return;
    }

    if (inputUrl.trim() !== "") {
      const toastId = toast.loading("Saving...");
      setCurrToast(toastId);

      mutateLink({ link: inputUrl.trim(), parentFolderId: currFolderId });
    }
  }

  function onOpenChange() {
    if (!props.isOpen) {
      props.setIsOpen(true);
    } else {
      props.setIsOpen(false);
      setEntityInput("");
      setSelectedEntity(null);
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={props.isOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      {/* create new page */}
      <DialogContent className="h-64 sm:w-[425px]">
        {!selectedEntity && (
          <>
            <DialogHeader>
              <DialogTitle>Add new</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-2">
              {/* add link */}
              <div
                className="flex w-4/5 flex-row items-center gap-2 rounded-md bg-primary-foreground p-3 hover:bg-muted"
                onClick={(e) => setSelectedEntity("link")}
              >
                <div className="mr-2 flex flex-row items-center justify-center rounded-md bg-blue-100 p-3 dark:bg-blue-800">
                  <Link2Icon className="h-6 w-6" />
                </div>
                <span>Web link</span>
              </div>

              {/* add folder */}
              <div
                className="flex w-4/5 flex-row items-center justify-start gap-2 rounded-md bg-primary-foreground p-3 hover:bg-muted"
                onClick={(e) => setSelectedEntity("folder")}
              >
                <div className="mr-2 flex flex-row items-center justify-center rounded-md bg-purple-100 p-3 dark:bg-purple-800">
                  <FolderPlusIcon className="h-6 w-6" />
                </div>
                <span> Folder</span>
              </div>
            </div>
          </>
        )}

        {/* when adding new link */}
        {selectedEntity === "link" && (
          <div className="flex flex-col justify-around">
            <DialogHeader className="flex flex-col items-start">
              <DialogTitle className="flex flex-row items-center justify-start">
                <ArrowLeft
                  className="mr-3 h-6 w-6"
                  onClick={() => {
                    // reset
                    setEntityInput("");
                    setSelectedEntity(null);
                  }}
                />
                New link
              </DialogTitle>

              <DialogDescription>
                Enter the link you wish to save
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  autoFocus
                  placeholder="https://example.com"
                  ref={inputRef}
                  value={entityInput}
                  id="link"
                  onChange={(e) => setEntityInput(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => {
                  if (inputRef.current) {
                    saveArticle(inputRef.current.value);
                  }
                }}
              >
                <span className="sr-only">Save</span>
                <ForwardIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}

        {/* when adding new folder */}
        {selectedEntity === "folder" && (
          <div className="flex flex-col justify-around">
            <DialogHeader className="flex flex-col items-start">
              <DialogTitle className="flex flex-row items-center justify-start">
                <ArrowLeft
                  className="mr-3 h-6 w-6"
                  onClick={() => {
                    // reset
                    setEntityInput("");
                    setSelectedEntity(null);
                  }}
                />
                New folder
              </DialogTitle>
              <DialogDescription>
                Creates a new folder in current directory
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  autoFocus
                  placeholder="Folder name"
                  ref={inputRef}
                  value={entityInput}
                  id="link"
                  onChange={(e) => setEntityInput(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => {
                  if (inputRef.current) {
                    createFolderWithName({ name: inputRef.current.value });
                  }
                }}
              >
                <span className="sr-only">Save</span>
                <ForwardIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddNewEntityDialog;
