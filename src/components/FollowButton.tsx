"use client";

import { ProfileUser } from "@/models/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { homeUser: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const isShowButton = loggedInUser && loggedInUser.username !== username;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = isFollowing ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {isShowButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            isRed={text === "Unfollow"}
          />
        </div>
      )}
    </>
  );
}
