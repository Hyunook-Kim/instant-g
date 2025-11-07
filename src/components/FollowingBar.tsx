"use client";
import Link from "next/link";
import React from "react";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/useMe";

export default function FollowingBar() {
  const { homeUser, isLoading, error } = useMe();

  const followingUsers = homeUser?.following;
  // const followingUsers = undefined;
  // const followingUsers = homeUser?.following && [
  //   ...homeUser?.following,
  //   ...homeUser?.following,
  //   ...homeUser?.following,
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
