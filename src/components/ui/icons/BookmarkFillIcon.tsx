import { RiBookmarkFill } from "react-icons/ri";

type Props = {
  className?: string;
};

export default function BookmarkIcon({ className }: Props) {
  return <RiBookmarkFill className={className || "h-6 w-6"} />;
}
