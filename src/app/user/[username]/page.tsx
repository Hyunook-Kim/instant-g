import UserProfile from "@/components/UserProfile";
import { ProfileUser } from "@/models/user";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  // top: user profile, image, info(username, name, number)
  // bottom: 3 tab ( posts, liked, bookmarks)
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}
