import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const apiKeyHeader = req.headers.get("API-Key");
  const path = req.nextUrl.pathname;

  if (
    apiKeyHeader !== process.env.NEXT_PUBLIC_API_KEY &&
    !path.includes("auth")
  ) {
    return new Response("API key is missing", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
