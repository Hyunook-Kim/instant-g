"use client";
import { HomeUser } from "@/models/user";
import Link from "next/link";
import React from "react";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<HomeUser>("/api/me");
  const followingUsers = data?.following;
  // const followingUsers = undefined;
  // const followingUsers = data?.following && [
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  // ];

  return (
    <section className="relative z-0 mb-4 flex min-h-[90px] w-full items-center justify-center overflow-x-auto rounded-lg p-4 shadow-sm shadow-neutral-300">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!followingUsers || followingUsers.length === 0) && (
          <p>You don`t have following</p>
        )
      )}
      {followingUsers && followingUsers.length > 0 && (
        <ScrollableBar>
          {followingUsers.map((user) => (
            <Link
              key={user.username}
              className="flex w-20 flex-col items-center"
              href={`/user/${user.username}`}
            >
              <Avatar image={user.image} />
              <p className="w-full overflow-hidden text-ellipsis text-center text-sm">
                {user.username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
