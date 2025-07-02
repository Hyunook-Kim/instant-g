import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getFollowingPostsOf } from "@/service/posts";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // return NextResponse.json(user);
  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data),
  );
}
