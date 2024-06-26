import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsVerticalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmationDialog from "./Dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { Folder } from "@/typings/folder/type";
import { deleteFolderById, updateFolderMetaById } from "@/api/folders";
import { AxiosError } from "axios";

type Props = {
  folder: Folder;
};

const FolderOptions = ({ folder }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [currToast, setCurrToast] = useState("");
  const queryClient = useQueryClient();
  const [folderMetaData, setFolderMetaData] = useState<{
    name: string;
  } | null>(null);

  // delete article
  const { mutate: deleteFolder } = useMutation({
    mutationFn: deleteFolderById,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Folder deleted!");

      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
    },
    onError: (error) => {
      toast.dismiss(currToast);
      toast.error(`Error!`);
    },
    onSettled: () => {},
  });

  // updating metadata (title)
  const { mutate: updateFolder } = useMutation({
    mutationFn: updateFolderMetaById,
    onSuccess: (data) => {
      toast.dismiss(currToast);
      toast.success("Updated!");

      // invalidate query
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
    },
    onError: (error) => {
      toast.dismiss(currToast);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message[0]);
      } else {
        toast.error(`Error!`);
      }
    },
    onSettled: () => {},
  });

  async function toggleRenameDialog() {
    setRenameDialogOpen((prev) => !prev);
  }

  async function deleteCallback() {
    const toastId = toast.loading("Deleting...");
    setCurrToast(toastId);
    deleteFolder({ id: folder._id });
  }

  return (
    <>
      {/* setting modal to false, prevent drop down from remaining open */}
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
              <Pencil1Icon width={"18"} height={"18"} className="mr-2" /> Rename
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* alert dialog */}
      <ConfirmationDialog
        openDialog={isDeleteDialogOpen}
        setOpenDialog={setIsDeleteDialogOpen}
        cb={deleteCallback}
        title="Are you sure?"
        description="This action cannot be undone. This will delete the folder and all its content."
      />

      {/* rename dialog */}
      <Dialog onOpenChange={toggleRenameDialog} open={renameDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only">Folder</Label>
              <Input
                defaultValue={folder.name}
                onChange={(e) =>
                  setFolderMetaData({ name: e.target.value.trim() })
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
                  !folderMetaData?.name || folderMetaData?.name === folder?.name
                }
                onClick={() => {
                  if (folderMetaData?.name) {
                    updateFolder({
                      id: folder._id,
                      name: folderMetaData?.name,
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
    </>
  );
};

export default FolderOptions;
