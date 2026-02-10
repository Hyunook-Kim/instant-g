import { useCacheKeys } from "@/context/CacheKeysContext";
import { Comment, SimplePost } from "@/models/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, isLike: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, isLike }),
  }).then((res) => res.json());
}

async function addComment(postId: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ postId, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKey = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKey.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, isLike: boolean) => {
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
    },
    [posts, mutate],
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  return { posts, isLoading, error, setLike, postComment };
}
