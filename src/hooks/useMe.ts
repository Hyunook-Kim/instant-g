import { HomeUser } from "@/models/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postId: string, isBookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, isBookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, isFollow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetId, isFollow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const {
    data: homeUser,
    isLoading,
    error,
    mutate,
  } = useSWR<HomeUser>("/api/me");

  const setBookmark = useCallback(
    (postId: string, isBookmark: boolean) => {
      if (!homeUser) return;

      const bookmarks = homeUser.bookmarks;
      const newHomeUser = {
        ...homeUser,
        bookmarks: isBookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b! == postId),
      };

      return mutate(updateBookmark(postId, isBookmark), {
        optimisticData: newHomeUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [homeUser, mutate],
  );

  const toggleFollow = (targetId: string, isFollow: boolean) => {
    return mutate(updateFollow(targetId, isFollow), { populateCache: false });
  };

  return { homeUser, isLoading, error, setBookmark, toggleFollow };
}
