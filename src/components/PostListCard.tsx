import { SimplePost } from "@/models/post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/utils/date";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { id, username, userImage, image, text, createdAt, likes, comments } =
    post;

  return (
    <article className="rounded-md border border-gray-200 shadow-md">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="ml-2 font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="aspect-square w-full object-cover"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className="my-2 flex justify-between px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center border-t border-neutral-300">
          <SmileIcon />
          <input
            className="ml-2 w-full border-none p-3 outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button className="ml-2 font-bold text-sky-500">Post</button>
        </form>
      </div>
    </article>
  );
}
