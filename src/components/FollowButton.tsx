"use client";

import { ProfileUser } from "@/models/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { homeUser: loggedInUser } = useMe();

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
