"use client";
import { DetailUser } from "@/models/user";
import Link from "next/link";
import React from "react";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  const followingUsers = data?.following;

  return (
    <section>
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!followingUsers || followingUsers.length === 0) && (
          <p>You don`t have following</p>
        )
      )}
      {followingUsers && followingUsers.length > 0 && (
        <ul>
          {followingUsers.map((user) => (
            <li key={user.username}>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
                <p>{user.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
