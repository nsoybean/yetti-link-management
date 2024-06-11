import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
  FolderPlusIcon,
  FilePlus2Icon,
  PlusIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
import { SaveArticleInput } from "./SaveArticleInput";
import { AddNewFolderDialog } from "./AddNewFolderDialog";

type Props = {
  trigger: any;
};

const AddNew = (props: Props) => {
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{props.trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {/* folder */}
            <DropdownMenuItem
              onSelect={(e) => {
                setIsAddFolderDialogOpen(true);
              }}
            >
              <FolderPlusIcon className="mr-2 h-4 w-4" />
              <span>Add folder</span>
            </DropdownMenuItem>
            {/* link */}
            <DropdownMenuItem
              onSelect={(e) => {
                setIsAddLinkDialogOpen(true);
              }}
            >
              <Link2Icon className="mr-2 h-4 w-4" />
              <span>Add link</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* new folder */}
      {isAddFolderDialogOpen && (
        <AddNewFolderDialog
          onEventListener={true}
          setIsOpen={setIsAddFolderDialogOpen}
          isOpen={isAddFolderDialogOpen}
        />
      )}

      {/* new link */}
      {isAddLinkDialogOpen && (
        <SaveArticleInput
          onEventListener={true}
          setIsOpen={setIsAddLinkDialogOpen}
          isOpen={isAddLinkDialogOpen}
        />
      )}
    </>
  );
};

export default AddNew;
