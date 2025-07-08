"user client";

import { SimplePost } from "@/models/post";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { id, username, userImage, image, text, createdAt, likes, comments } =
    post;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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
        priority={priority}
        onClick={() => setIsOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {isOpenModal && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpenModal(false)}>
            <div>POST DETAIL CONTENTS</div>
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
