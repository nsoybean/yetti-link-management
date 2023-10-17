import React, { KeyboardEvent, useContext, useEffect, useState } from "react";

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import BookmarkAPI from "../../../api/BookmarkAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../../api/context/authContext";
import { BookmarkChangeContext } from "../../../api/context/bookmarkChangeContext";

function InputSave({ setShowUrlInput }: InputSaveProps) {
  const { authToken } = useContext(AuthContext);
  const bearerToken = authToken.accessToken ?? "";
  const { bookmarkChange, setBookmarkChange } = useContext(
    BookmarkChangeContext
  );

  const {
    mutate: addBookmark,
    isLoading: isAddingLoading,
    error: addBookmarkErr,
    data: addBookmarkData,
  } = useMutation(BookmarkAPI.addBookmarkV3);
  const [inputUrl, setInputUrl] = useState("");
  const [loadingToastId, setLoadingToastId] = useState("");

  const addUrl = () => {
    addBookmark(
      {
        link: inputUrl,
        token: bearerToken,
      },
      {
        onSuccess: () => {
          toast.success("Url saved!");
          setBookmarkChange(!bookmarkChange);
        },
        onError: () => {
          toast.error("Error saving url!");
        },
        onSettled: () => {
          setInputUrl("");
        },
      }
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addUrl();
    } else if (event.key === "Escape") {
      setInputUrl("");
      setShowUrlInput(false);
    }
  };

  useEffect(() => {
    if (isAddingLoading) {
      const loadingToast = toast.loading("Saving url...");
      setLoadingToastId(loadingToast);
    } else {
      toast.dismiss(loadingToastId);

      if (!addBookmarkErr && addBookmarkData) {
        setShowUrlInput((prev) => !prev); // reset input save bar only if API is successful
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingLoading]);

  return (
    <>
      <Stack>
        <InputGroup variant="custom" colorScheme="brand">
          <InputLeftAddon> URL:</InputLeftAddon>
          <Input
            // samesit="None"
            autoComplete="off"
            id="input"
            autoFocus={true}
            value={inputUrl}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/"
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              variant="primary"
              sx={{
                borderRadius: "50%",
              }}
              onClick={addUrl}
              aria-label="Add url"
              icon={<AddIcon color="neutral.main" />}
            />
          </InputRightElement>
        </InputGroup>
      </Stack>
    </>
  );
}

export default InputSave;

interface InputSaveProps {
  setShowUrlInput: React.Dispatch<React.SetStateAction<boolean>>;
}
