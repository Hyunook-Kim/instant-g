import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} size="medium" highlight />
      <span className="ml-2 font-bold text-gray-900">{username}</span>
    </div>
  );
}
