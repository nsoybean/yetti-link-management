import axios from "axios";
import { type AxiosError } from "axios";
import { API_URL } from "./env";
import { authToken, clearAuthToken } from "./auth";

const api = axios.create({
  baseURL: API_URL,
});

// add mock delay to api client
// if (window.location.hostname === "localhost") {
//   api.interceptors.response.use((response) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(response);
//       }, 1000); // 1s mock delay
//     });
//   });
// }

api.interceptors.request.use((request) => {
  if (authToken) {
    request.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return request;
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    clearAuthToken();
    // prompt re-login
    // Note: do not redirect when on '/' and '/' as it will cause infinite re-render as these public facing pages uses useAuth hook too
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/pricing"
    ) {
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
});

/**
 * Takes an error returned by the app's API (as returned by axios), and transforms into a more
 * standard format to be further used by the client. It is also assumed that given API
 * error has been formatted as implemented by HttpError on the server.
 */
export function handleApiError(
  error: AxiosError<{ message?: string; data?: unknown }>,
): void {
  if (axios.isAxiosError(error)) {
    if (error?.response) {
      // If error came from HTTP response, we capture most informative message
      // and also add .statusCode information to it.
      // If error had JSON response, we assume it is of format { message, data } and
      // add that info to the error.
      // TODO: We might want to use HttpError here instead of just Error, since
      //   HttpError is also used on server to throw errors like these.
      //   That would require copying HttpError code to web-app also and using it here.
      const responseJson = error.response?.data;
      const responseStatusCode = error.response.status;
      throw new WaspHttpError(
        responseStatusCode,
        responseJson?.message ?? error.message,
        responseJson,
      );
    }
  } else {
    // If any other error, we just propagate it.
    throw error;
  }
}

class WaspHttpError extends Error {
  statusCode: number;

  data: unknown;

  constructor(statusCode: number, message: string, data: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default api;
