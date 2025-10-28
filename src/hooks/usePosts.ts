import { SimplePost } from "@/models/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePosts() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
  const { mutate } = useSWRConfig();
  const setLike = (post: SimplePost, username: string, isLike: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, isLike }),
    }).then(() => mutate("/api/posts"));
  };

  return { posts, isLoading, error, setLike };
}
