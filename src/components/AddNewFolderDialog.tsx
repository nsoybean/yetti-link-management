import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ForwardIcon } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { AxiosError } from "axios";
import { createFolder } from "@/api/folders";
import { useFolder } from "@/hooks/FolderProvider";

type Props = {
  trigger?: any; // dialog trigger
  onEventListener: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddNewFolderDialog = (props: Props) => {
  const [folderName, setFolderName] = useState("");
  const [currToast, setCurrToast] = useState("");
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { folder: currFolderId } = useFolder();

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  const { mutate, status } = useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      setFolderName("");
      props.setIsOpen(false);
      if (inputRef?.current) {
        inputRef.current.blur();
      }
      toast.dismiss(currToast);
      toast.success("Folder created!");
    },

    onError: (error) => {
      let axiosError = error as AxiosError<{ message: string }>;
      toast.dismiss(currToast);
      toast.error(`Error! ${axiosError.response?.data.message}`);
      setFolderName("");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-articles"],
      });
    },
  });

  const onKeyPress = async (event: KeyboardEvent) => {
    // open dialog
    if (props.onEventListener) {
      if ((event.metaKey || event.ctrlKey) && event.key === "n") {
        event.preventDefault();
        props.setIsOpen(true);
      }
    }

    // Check if the 'esp key' key is pressed
    if (event.key === "Escape") {
      // remove focus and clear input
      if (inputRef.current) {
        setFolderName("");
        inputRef.current.blur();
      }
    }

    // Check if the 'enter key' key is pressed and the focus is on the input
    if (event.key === "Enter" && document.activeElement === inputRef.current) {
      if (inputRef.current) {
        createFolderWithName({ name: inputRef.current.value });
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
      mutate({ parentFolderId: currFolderId, folderName: name.trim() });
    }
  }

  return (
    <Dialog onOpenChange={props.setIsOpen} open={props.isOpen}>
      {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New folder</DialogTitle>
          <DialogDescription>
            Creates a new folder in current directory
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              placeholder="Folder name"
              ref={inputRef}
              value={folderName}
              id="link"
              onChange={(e) => setFolderName(e.target.value)}
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
            <span className="sr-only">Create</span>
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
      </DialogContent>
    </Dialog>
  );
};
