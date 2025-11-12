import { parseDate } from "@/utils/date";
import React, { useState } from "react";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/models/post";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { homeUser: user, setBookmark } = useMe();
  const { setLike } = usePosts();
  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (isLike: boolean) => {
    user && setLike(post, user.username, isLike);
  };

  const handleBookmark = (isBookmark: boolean) => {
    user && setBookmark(id, isBookmark);
  };

  const handlePostComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
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
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {children}
        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handlePostComment} />
    </>
  );
}
