import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { getFollowingPostsOf, getPost } from "@/service/posts";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
