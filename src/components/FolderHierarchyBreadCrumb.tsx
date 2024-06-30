import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { ChevronRight, FolderIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  parentFolderHierarchy: {
    maxDepthLookupReached: boolean;
    list: {
      _id: string;
      name: string;
    }[];
  };
};

/**
 * @returns folder breadcrumbs
 * eg. saves > folder_1
 * saves > folder_1 > folder_2
 * saves > ... > folder_2  > folder_3. "..." shows max 4 levels of parent folder
 */
const FolderHierarchyBreadCrumb = ({ parentFolderHierarchy }: Props) => {
  const navigate = useNavigate();
  const { folderId } = useParams();

  let reversedParentToChildFolder: {
    _id: string;
    name: string;
  }[] = parentFolderHierarchy.list.map(
    (item, idx) =>
      parentFolderHierarchy.list[parentFolderHierarchy.list.length - 1 - idx],
  );

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

  // case 1. if less than 2 levels, render all
  // saves > folder_1 > folder_2
  if (reversedParentToChildFolder.length <= 2) {
    return (
      <div className="flex flex-row items-center gap-2">
        <div
          className="rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
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
                className="rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
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
        <div className="text-xl font-semibold">
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
                className="rounded-md px-2 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-accent"
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
  }

  // base
  <div className="ml-2 text-xl font-semibold"> Saves </div>;
};

export default FolderHierarchyBreadCrumb;
