import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@/typings/user/User";
import useLogout from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme-provider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserDropdownMenu({ user }: { user: User }) {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  if (!user) {
    return null;
  }

  const { logout } = useLogout();
  const queryClient = useQueryClient();
  function getFallbackName(user: User): string {
    let name = "";
    if (user.firstName) {
      name += user.firstName[0].toUpperCase();
    }
    if (user.lastName) {
      name += user.lastName[0].toUpperCase();
    }

    return name;
  }

  function logUserOut() {
    logout();

    // invalidate
    queryClient.invalidateQueries({ queryKey: ["getMe"] });
  }

  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 hover:cursor-pointer">
          <AvatarImage src={user.picture} />
          <AvatarFallback>{getFallbackName(user)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* profile */}
        <DropdownMenuLabel className="flex flex-row items-center justify-start gap-2 py-1">
          {/* pic */}
          <div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.picture} />
              <AvatarFallback>{getFallbackName(user)}</AvatarFallback>
            </Avatar>
          </div>
          {/* name */}
          <div className="text-md font-normal">
            {`${user.firstName} ${user.lastName}`.trim()}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* mode */}
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem
            className="flex w-full justify-between gap-2"
            onSelect={(e) => e.preventDefault()}
          >
            Dark Mode
            <Switch
              className="mr-2"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem onClick={() => navigate("/account")}>
            Account Settings
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* teams */}
        {/* <DropdownMenuGroup className="py-1">
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}

        {/* support */}
        {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem onClick={() => logUserOut()}>
            Log out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
