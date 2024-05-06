import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { ArchiveIcon, BookmarkIcon, Check, Menu, TagIcon } from "lucide-react";
// import { ModeToggle } from "./ModeToggle";
import useAuth from "@/hooks/useAuth";
import appIcon from "/appIcon.png";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { SaveArticleInput } from "./SaveArticleInput";
import { RouteProps } from "@/typings/navigation/articleMenu";
import {
  Link2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { getUrlPath } from "@/lib/url";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { ComboBoxItemType, SearchCombobox } from "./SearchComboBox";
import { Input } from "./ui/input";
import { ISearchArticle } from "@/typings/search/articles";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/api/articles";
import { ArticleStateEnum } from "@/typings/article/Article";
import { Skeleton } from "./ui/skeleton";

const LogoIcon = () => <img className="h-8 w-8" src={appIcon} alt="Yetti.ai" />;

export const mobileMenu: RouteProps[] = [
  { name: "Saves", href: "/saves", icon: Link2Icon },
  { name: "Archives", href: "/archives", icon: ArchiveIcon },
  { name: "Tags", href: "/tags", icon: TagIcon },
];

export const desktopMenu: RouteProps[] = [];

export const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [searchArticleResult, setsearchArticleResult] = useState<
    ISearchArticle[]
  >([]);

  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchDialogOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // reset search results everytime search dialog open/close
  useEffect(() => {
    setsearchArticleResult([]);
  }, [searchDialogOpen]);

  function renderSearchArticleResult(articleResults: ISearchArticle[]) {
    // filter array into available and archive states
    let availableArticles = articleResults.filter(
      (article) => article.state === ArticleStateEnum.AVAILABLE,
    );
    let archiveArticles = articleResults.filter(
      (article) => article.state === ArticleStateEnum.ARCHIVED,
    );
    return (
      <div className="p-1">
        {/* available articles */}
        {availableArticles && availableArticles.length > 0 && (
          <CommandGroup>
            {availableArticles.map((article) => {
              return (
                <CommandItem
                  key={article.id}
                  onSelect={() => {
                    window.open(article.link, "_blank", "noopener,noreferrer");
                  }}
                >
                  <div className="space-1 flex flex-col">
                    <div className="line-clamp-1">{article.title}</div>
                    <div className="line-clamp-1 text-muted-foreground">
                      {article.description}
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {/* archived articles */}
        {archiveArticles && archiveArticles.length > 0 && (
          <CommandGroup heading="Archived">
            <CommandSeparator />
            {archiveArticles.map((article) => {
              return (
                <CommandItem
                  key={article.id}
                  onSelect={() => {
                    window.open(article.link, "_blank", "noopener,noreferrer");
                  }}
                >
                  <div className="space-1 flex flex-col">
                    <div className="line-clamp-1">{article.title}</div>
                    <div className="line-clamp-1 text-muted-foreground">
                      {article.description}
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </div>
    );
  }

  const handleOnSearchChange = useDebouncedCallback(async (e: string) => {
    if (e === "" || !e) {
      return;
    }

    // reset results
    setsearchArticleResult([]);

    // call search api
    setIsSearchLoading(true);
    const results = await search({ term: e });
    setIsSearchLoading(false);

    // set results
    if (results && results.length > 0) {
      setsearchArticleResult(results);
    } else {
      setsearchArticleResult([]);
    }
  }, 300);

  // const {
  //   isLoading: searchLoading,
  //   error,
  //   data: articles,
  // } = useQuery({
  //   queryKey: ["search", currPage],
  //   queryFn: async () => search(currPage),
  // });

  return (
    <header className="sticky top-0 z-40 mb-6 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen flex-row justify-between px-4">
          <NavigationMenuItem className="font-bold">
            {/* app icon, visible beyond lg*/}
            <a href={user ? "/saves" : "/"} className="ml-2 hidden lg:flex">
              <LogoIcon />
            </a>

            {/* mobile burger menu, hidden beyond lg */}
            <span className="flex lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex h-5 w-5 lg:hidden"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"left"}>
                  <SheetHeader className="flex flex-row items-center justify-center gap-3">
                    {/* icon */}
                    <NavigationMenuItem className="flex font-bold">
                      <a href={user ? "/saves" : "/"}>
                        <LogoIcon />
                      </a>
                    </NavigationMenuItem>
                    <SheetTitle className="flex items-center pb-[8px] text-xl font-bold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                    {mobileMenu.map((link, index) => {
                      return (
                        <Button
                          key={index}
                          variant={"ghost"}
                          className={`flex w-full flex-row items-center justify-start rounded-md p-2 text-sm ${getUrlPath() === link.href && "bg-secondary"}`}
                          onClick={() => {
                            navigate(link.href);
                            setIsOpen(false);
                          }}
                        >
                          {<link.icon className="mr-2 h-4 w-4" />}
                          <span> {link.name}</span>
                        </Button>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </span>
          </NavigationMenuItem>

          {/* search */}
          {/* <div>
            <p className="text-md">
              Search{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-lg">⌘ </span> K
              </kbd>
            </p>
          </div> */}
          <Button variant={"outline"} onClick={() => setSearchDialogOpen(true)}>
            <div className="flex flex-row items-center justify-center gap-4">
              <span>Search</span>
              <MagnifyingGlassIcon className="ml-1 h-5 w-5 shrink-0 opacity-50" />
              {/* keyboard shortcut - only non-mobile */}
              <div className="hidden sm:flex">
                <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                  <span>⌘</span>
                </kbd>
                <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                  <span>K</span>
                </kbd>
              </div>
              {/* mobile */}
            </div>
          </Button>

          {/* actions */}
          <div className="flex items-center justify-center gap-3">
            {/* input link */}
            {user && (
              <SaveArticleInput
                trigger={
                  <Button variant={"outline"}>
                    <div className="flex flex-row items-center justify-center gap-4">
                      <span>Add Link</span>
                      {/* keyboard shortcut - only non-mobile */}
                      <div className="hidden sm:flex">
                        <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                          <span>⌘</span>
                        </kbd>
                        <kbd className="text-md flex flex-row items-center justify-center rounded-md border px-1 text-start">
                          <span>/</span>
                        </kbd>
                      </div>
                      {/* mobile */}
                      <div className="flex items-center justify-center sm:hidden">
                        <PlusIcon />
                      </div>
                    </div>
                  </Button>
                }
                onEventListener={true}
              />
            )}
            {/* user */}
            {user && <UserDropdownMenu user={user} />}
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      {/* search dialog */}
      <CommandDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <div className="flex flex-row items-center border-b px-3 pt-1">
          <MagnifyingGlassIcon className="mr-2 h-5 w-5 shrink-0 opacity-50" />
          <Input
            placeholder="Type to search..."
            className="text-md flex h-10 w-full border-0 bg-transparent py-3 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            onChange={(e) => handleOnSearchChange(e.target.value)}
          />
        </div>
        <CommandList>
          {/* if empty */}
          {!isSearchLoading && <CommandEmpty>No results found.</CommandEmpty>}

          {/* loading */}
          {isSearchLoading && (
            <div className="flex flex-col space-y-4 p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[250px] rounded-md" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-[250px] rounded-md" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          )}

          {/* results */}
          {searchArticleResult &&
            searchArticleResult.length > 0 &&
            renderSearchArticleResult(searchArticleResult)}
        </CommandList>
      </CommandDialog>
    </header>
  );
};
