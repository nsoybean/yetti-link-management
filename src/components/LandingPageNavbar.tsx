import { useState } from "react";
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

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import useAuth from "@/hooks/useAuth";
import appIcon from "/appIcon.png";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  //   {
  //     href: "#features",
  //     label: "Features",
  //   },
];
const LogoIcon = () => <img className="h-8 w-8" src={appIcon} alt="leaf.ai" />;

export const LandingPageNavbar = () => {
  const { data: user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700  dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen flex-row justify-between px-4">
          {/* app icon */}
          <NavigationMenuItem className="align-center flex flex-row justify-start font-bold">
            <a href={user ? "/saves" : "/"} className="ml-2 hidden sm:flex">
              <LogoIcon />
              <span className="ml-2 flex pt-[2px] text-xl font-bold">Leaf</span>
            </a>
          </NavigationMenuItem>

          {/* actions */}
          <div className="flex items-center justify-center gap-3">
            {/* mode */}
            <ModeToggle />

            {/* mobile burger menu */}
            {/* <span className="flex lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex h-5 w-5 lg:hidden"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"right"}>
                  <SheetHeader className="flex flex-row items-center justify-center gap-3">
                    <NavigationMenuItem className="flex font-bold">
                      <a href={user ? "/saves" : "/"}>
                        <LogoIcon />
                      </a>
                    </NavigationMenuItem>
                    <SheetTitle className="flex items-center text-xl font-bold">
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
            </span> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
