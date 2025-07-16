import { SearchUser } from "@/models/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link
      className="mb-2 flex w-full items-center rounded-sm border border-neutral-300 bg-white p-4 hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="font-bold leading-4 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
