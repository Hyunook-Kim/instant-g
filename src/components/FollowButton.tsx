"use client";

import { HomeUser, ProfileUser } from "@/models/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");

  const isShowButton = loggedInUser && loggedInUser.username !== username;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = isFollowing ? "Unfollow" : "Follow";

  return (
    <>
      {isShowButton && (
        <Button text={text} onClick={() => {}} isRed={text === "Unfollow"} />
      )}
    </>
  );
}
