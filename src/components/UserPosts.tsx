"use client";

import { useState } from "react";
import { ProfileUser } from "@/models/user";
import useSWR from "swr";

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  // /api/users/username/posts
  // /api/users/username/saved
  // /api/users/username/liked

  const [tab, setTab] = useState("saved");
  const { data, isLoading, error } = useSWR(`/api/users/${username}/${tab}`);
  console.log("data", data);

  return <div></div>;
}
