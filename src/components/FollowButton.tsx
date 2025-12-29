"use client";

import { ProfileUser } from "@/models/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { homeUser: loggedInUser, toggleFollow } = useMe();

  const isShowButton = loggedInUser && loggedInUser.username !== username;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = isFollowing ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(user.id, !isFollowing);
  };

  return (
    <>
      {isShowButton && (
        <Button
          text={text}
          onClick={handleFollow}
          isRed={text === "Unfollow"}
        />
      )}
    </>
  );
}
