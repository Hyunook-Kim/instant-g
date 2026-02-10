import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/posts";
import { getUserByUsername } from "@/service/user";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bas Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  switch (query) {
    case "saved":
      request = getSavedPostsOf;
      break;
    case "liked":
      request = getLikedPostsOf;
      break;
  }

  return request(username).then((data) => NextResponse.json(data));
}
