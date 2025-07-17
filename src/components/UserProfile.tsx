import { ProfileUser } from "@/models/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { name: "posts", data: posts },
    { name: "followers", data: followers },
    { name: "following", data: following },
  ];
  return (
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ name, data }, idx) => (
            <li key={idx}>
              <span>{name}</span>
              {data}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
