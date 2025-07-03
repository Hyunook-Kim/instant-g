"use client";

import { SimplePost } from "@/models/post";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

export default function PostList() {
  // const { data: rawData } = useSWR("/api/post/raw");
  // console.log("@@raw data@@", rawData);
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/post");

  return (
    <section>
      {isLoading && (
        <div>
          <GridLoader color="red" />
        </div>
      )}
      {
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
