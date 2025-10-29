import { parseDate } from "@/utils/date";
import React, { useState } from "react";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { SimplePost } from "@/models/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/usePosts";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  // const [liked, setLiked] = useState<boolean>(
  //   user ? likes.includes(user.username) : false,
  // );
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { setLike } = usePosts();

  const handleLike = (isLike: boolean) => {
    if (user) {
      setLike(post, user.username, isLike);
    }
  };

  return (
    <>
      <div className="my-2 flex justify-between px-4">
        <ToggleButton
          isToggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          isToggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
