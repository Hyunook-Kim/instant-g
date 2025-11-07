import { HomeUser } from "@/models/user";
import useSWR from "swr";

async function updateBookmark(postId: string, isBookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, isBookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const {
    data: homeUser,
    isLoading,
    error,
    mutate,
  } = useSWR<HomeUser>("/api/me");

  const setBookmark = (postId: string, isBookmark: boolean) => {
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
  };

  return { homeUser, isLoading, error, setBookmark };
}
