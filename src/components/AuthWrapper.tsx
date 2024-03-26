import { ReactNode } from "react";

export function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-xl ring-1 ring-gray-900/10 dark:bg-white dark:text-gray-900 sm:rounded-lg sm:px-10">
          <div className="my-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
