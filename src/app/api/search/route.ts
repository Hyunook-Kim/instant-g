// export const GET = async (req: Request) =>{}

import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
