import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { addPost, getFollowingPostsOf } from "@/service/posts";

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

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as Blob;
  const comment = formData.get("text") as string;

  if (!comment || !file) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  return addPost({ userId: user.id, file, comment })
    .then((data) => NextResponse.json(data))
    .catch((error) => new NextResponse(error.message, { status: 500 }));
}
