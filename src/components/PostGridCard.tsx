import { SimplePost } from "@/models/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { image, username } = post;
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setIsOpenModal(true);
  };

  return (
    <div className="relative aspect-square w-full">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPost}
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
