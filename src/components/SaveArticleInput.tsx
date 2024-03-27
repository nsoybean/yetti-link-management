import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addArticle } from "@/api/articles";
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

type Props = {
  trigger: any; // dialog trigger
  onEventListener: boolean;
};

export const SaveArticleInput = (props: Props) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currToast, setCurrToast] = useState("");
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  const { mutate, status } = useMutation({
    mutationFn: addArticle,
    onSuccess: (data) => {
      setUrl("");
      setIsOpen(false);
      if (inputRef?.current) {
        inputRef.current.blur();
      }
      toast.dismiss(currToast);
      toast.success("Link Added!");
    },

    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
      setUrl("");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
    },
  });

  const onKeyPress = async (event: KeyboardEvent) => {
    // open dialog
    if (props.onEventListener) {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        setIsOpen(true);
      }
    }

    // Check if the 'esp key' key is pressed
    if (event.key === "Escape") {
      // remove focus and clear input
      if (inputRef.current) {
        setUrl("");
        inputRef.current.blur();
      }
    }

    // Check if the 'enter key' key is pressed and the focus is on the input
    if (event.key === "Enter" && document.activeElement === inputRef.current) {
      if (inputRef.current) {
        saveArticle(inputRef.current.value);
      }
    }
  };

  async function saveArticle(inputUrl: string) {
    if (inputUrl.trim() !== "") {
      const toastId = toast.loading("Saving...");
      setCurrToast(toastId);

      mutate({ link: inputUrl.trim() });
    }
  }

  return (
    <div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          {props.trigger}
          {/* <Button variant={"outline"}>
            <div className="flex flex-row items-center justify-center gap-4">
              <span>Add Link</span>
              <div className="flex">
                <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                  <span>⌘</span>
                </kbd>
                <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                  <span>/</span>
                </kbd>
              </div>
            </div>
          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a link</DialogTitle>
            <DialogDescription>
              Save it to your list of articles
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                placeholder="https://example.com"
                ref={inputRef}
                value={url}
                id="link"
                onChange={(e) => setUrl(e.target.value)}
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
        </DialogContent>
      </Dialog>

      {/* <Button className="gap-2">
        <span>Add Url</span>
        <kbd className="pointer-events-none right-10 inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[16px] font-medium opacity-100">
          /
        </kbd>
      </Button> */}

      {/* <div className="min-w-10 max-w-60">
        <Input
          ref={inputRef}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          placeholder="www.example.com"
        />
      </div> */}

      {/* keyboard shortcut, hidden if input is focused */}
      {/* {
        <kbd className="pointer-events-none relative right-10 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[16px] font-medium text-muted-foreground opacity-100">
          /
        </kbd>
      }
      <Button onClick={saveArticle} type="submit">
        Save
      </Button> */}
    </div>
  );
};
