"use client";

import { SimplePost } from "@/models/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/useFullPost";
import useMe from "@/hooks/useMe";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { post: data, postComment } = useFullPost(id);
  const { homeUser } = useMe();

  const comments = data?.comments;

  const handlePostComment = (comment: string) => {
    homeUser &&
      postComment({
        comment,
        username: homeUser.username,
        image: homeUser.image,
      });
  };

  return (
    <section className="flex h-full w-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="flex w-full basis-2/5 flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="mb-1 h-full overflow-auto border-t border-gray-200 p-4">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li className="mb-1 flex items-center" key={index}>
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="mr-1 font-bold">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              ),
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
}
