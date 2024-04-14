import { QueryClient } from "@tanstack/react-query";

let queryClientConfig: any;
let resolveQueryClientInitialized: any;
let isQueryClientInitialized: any;

export const queryClientInitialized = new Promise((resolve) => {
  resolveQueryClientInitialized = resolve;
});

export function configureQueryClient(config: any) {
  if (isQueryClientInitialized) {
    throw new Error(
      "Attempted to configure the QueryClient after initialization",
    );
  }

  queryClientConfig = config;
}

export function initializeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 10000 } },
  });
  isQueryClientInitialized = true;
  resolveQueryClientInitialized(queryClient);
}
