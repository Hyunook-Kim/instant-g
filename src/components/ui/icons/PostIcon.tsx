import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <AiOutlineHeart className={className || "h-7 w-7"} />;
}
