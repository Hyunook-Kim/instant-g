import { SimplePost } from "@/models/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { image, username } = post;
  return (
    <div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {isOpenModal && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
