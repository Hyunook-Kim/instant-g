"use client";

import { SimplePost } from "@/models/post";
import React from "react";
import useSWR from "swr";

export default function PostList() {
  // const { data: rawData } = useSWR("/api/post/raw");
  // console.log("@@raw data@@", rawData);
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/post");
  console.log("posts", posts);

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
    // <section>
    //   <div>avatar</div>
    //   <section>image post</section>
    //   <section>like and bookmark button</section>
    //   <section>wrtier`s comments</section>
    //   <div>time</div>
    //   <section>
    //     <div>imoji button</div>
    //     <div>Add a comment...</div>
    //     <div>post button</div>
    //   </section>
    // </section>
  );
}
