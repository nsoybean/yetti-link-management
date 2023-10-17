import { TIMEOUT } from "dns";
import { httpDelete, httpGet, httpPost, httpPatch } from "../helpers/http";
import { BASE_BACKEND_URL } from "./AuthAPI";
import { setTimeout } from "timers";

class BookmarkAPI {
  static getAllBookmark = async (page = 1, limit = 10, token: string) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark/?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true
    );
  };

  static getAllArchivedBookmark = async (
    page = 1,
    limit = 10,
    token: string
  ) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark/archive?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true
    );
  };

  static addBookmark = async ({
    link,
    token,
  }: {
    link: string;
    token: string;
  }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark`,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        link,
      },
      true
    );
  };

  static addBookmarkV2 = async ({
    link,
    token,
  }: {
    link: string;
    token: string;
  }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark/v2`,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        link,
      },
      true
    );
  };
  static addBookmarkV3 = async ({
    link,
    token,
  }: {
    link: string;
    token: string;
  }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark/v3`,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        link,
      },
      true
    );
  };

  static delBookmark = async ({ id, token }: { id: string; token: string }) => {
    return httpDelete(
      `${BASE_BACKEND_URL}/bookmark/${id}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true
    );
  };

  static archiveBookmark = async ({
    id,
    token,
  }: {
    id: string;
    token: string;
  }) => {
    return httpPatch(
      `${BASE_BACKEND_URL}/bookmark/${id}/archive`,
      {
        Authorization: `Bearer ${token}`,
      },
      true
    );
  };

  static restoreArchivedBookmark = async ({
    id,
    token,
  }: {
    id: string;
    token: string;
  }) => {
    return httpPatch(`${BASE_BACKEND_URL}/bookmark/${id}/unarchive`, {
      Authorization: `Bearer ${token}`,
    });
  };

  static updateBookMarkNotes = async ({
    id,
    token,
    note,
  }: {
    id: string;
    token: string;
    note: string;
  }) => {
    return httpPatch(
      `${BASE_BACKEND_URL}/bookmark/${id}/note`,
      {
        Authorization: `Bearer ${token}`,
      },
      { note: note }
    );
  };

  static getBookmarkById = async ({
    id,
    token,
  }: {
    id: string | undefined;
    token: string;
  }) => {
    if (!id) {
      return Promise.reject();
    }
    return httpGet(`${BASE_BACKEND_URL}/bookmark/${id}`, {
      Authorization: `Bearer ${token}`,
    });
  };
}

export default BookmarkAPI;
