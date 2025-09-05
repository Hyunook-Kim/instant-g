import { AiFillHeart } from "react-icons/ai";

type Props = {
  className?: string;
};
export default function HeartIcon({ className }: Props) {
  return <AiFillHeart className={className || "h-7 w-7 fill-red-500"} />;
}
