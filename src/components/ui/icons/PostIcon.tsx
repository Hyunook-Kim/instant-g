import { MdGridOn } from "react-icons/md";

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <MdGridOn className={className || "h-3 w-3"} />;
}
