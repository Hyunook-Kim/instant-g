"use client";

import { useState } from "react";
import { ProfileUser } from "@/models/user";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon /> },
  { type: "liked", icon: <HeartIcon /> },
];

export default function UserPosts({ user: { username } }: Props) {
  // /api/users/username/posts
  // /api/users/username/saved
  // /api/users/username/liked

  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
