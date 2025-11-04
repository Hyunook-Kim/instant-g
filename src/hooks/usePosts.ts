import { SimplePost } from "@/models/post";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, isLike: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, isLike }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, isLike: boolean) => {
    const newPost = {
      ...post,
      likes: isLike
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, isLike), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
}
