import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "../components/SideBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <>
      <section>
        <FollowingBar />
        <PostList />
        <SideBar user={user} />
      </section>
    </>
  );
}
