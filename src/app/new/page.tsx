import NewPost from "@/components/NewPost";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");

  return <NewPost user={session.user} />;
}
