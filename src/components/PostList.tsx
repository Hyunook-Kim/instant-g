"use client";

import { SimplePost } from "@/models/post";
import React from "react";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import dynamic from "next/dynamic";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

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
