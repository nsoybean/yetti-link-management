import ToolTipText from "@/components/TooltipText";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {};

const AccountPage = (props: Props) => {
  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();
  // skeleton
  // if (isLoading) {
  //   return (
  //     <div className="mx-auto w-5/6 rounded-lg border bg-card text-card-foreground shadow-md">
  //       {/* title */}
  //       <div className="flex flex-col space-y-1.5 p-6">
  //         <div className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
  //           Settings
  //         </div>
  //         <p className="text-sm text-muted-foreground">
  //           Update your account settings
  //         </p>
  //       </div>
  //       <Skeleton className="h-[125px] w-full rounded-xl" />
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto flex w-5/6 flex-col gap-2">
      {/* title */}
      <div className="flex flex-row items-center justify-start gap-2">
        <ToolTipText
          className="line-clamp-2 font-thin"
          text="Back"
          child={
            <ArrowLeftIcon
              className="h-6 w-6 hover:cursor-pointer"
              onClick={() => navigate(-1)}
            />
          }
        />
        <div className="flex flex-col space-y-1.5 p-2">
          <div className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Settings
          </div>
          <p className="text-sm text-muted-foreground">
            Update your account settings
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-md">
        {/* details */}
        <div className="space-y-6 p-6">
          {/* first name */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              First Name
            </label>
            <input
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="name"
              placeholder="Enter your name"
              value={user?.firstName}
            />
          </div>
          {/* last name */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Last Name
            </label>
            <input
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="name"
              placeholder="Enter your name"
              value={user?.lastName}
            />
          </div>
          {/* email */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              disabled
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="Enter your email"
              type="email"
              value={user?.email}
            />
          </div>
          {/* username */}
          {/* <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Username
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="username"
            placeholder="Enter your username"
            type="text"
          />
        </div> */}
          {/* profile pic */}
          {/* <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg"
              width="64"
              height="64"
              alt="Profile picture"
              className="rounded-full"
              //   style="aspect-ratio: 64 / 64; object-fit: cover;"
            />
            <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Upload new picture
            </button>
          </div>
        </div> */}

          {/* notif setting */}
          {/* <fieldset>
          <legend className="text-sm font-medium dark:text-gray-400">
            Notification Settings
          </legend>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              >
                <span
                  data-state="unchecked"
                  className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                data-state="checked"
                value="on"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              >
                <span
                  data-state="checked"
                  className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              >
                <span
                  data-state="unchecked"
                  className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
            </div>
          </div>
        </fieldset> */}
          <Separator />
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subscription Plan
            </label>
            <Badge
              variant={"default"}
              className="h-8 w-fit text-sm font-normal"
            >
              Free Tier
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
