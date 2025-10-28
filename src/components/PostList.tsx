"use client";

import React from "react";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/usePosts";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
          <GridSpinner color="red" />
        </div>
      )}
      {
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li className="mb-4" key={post.id}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
