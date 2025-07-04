"use client";

import { SimplePost } from "@/models/post";
import React from "react";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import dynamic from "next/dynamic";

export default function PostList() {
  // const { data: rawData } = useSWR("/api/post/raw");
  // console.log("@@raw data@@", rawData);
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/post");

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
            posts.map((post) => (
              <li className="mb-4" key={post.id}>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
