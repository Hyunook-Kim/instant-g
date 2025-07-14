"use client";

import { ProfileUser } from "@/models/user";
import { useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="my-4 flex w-full max-w-2xl flex-col items-center">
      <form className="mb-4 w-full" onSubmit={onSubmit}>
        <input
          className="w-full border border-gray-400 p-3 text-xl outline-none"
          type="text"
          autoFocus
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder={"Search for a username or name"}
        />
      </form>
      {error && <p>Something is wrong</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자 없음</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
