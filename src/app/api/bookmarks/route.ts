import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }

  const { id, isBookmark } = await req.json();
  if (!id || isBookmark === undefined) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const request = isBookmark ? addBookmark : removeBookmark;

  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new NextResponse(JSON.stringify(error), { status: 500 }));
}
