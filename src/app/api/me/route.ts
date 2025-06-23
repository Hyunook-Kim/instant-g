import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserByUsername } from "@/service/user";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // return NextResponse.json(user);
  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data),
  );
}
