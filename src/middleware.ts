import type { IncomingHttpHeaders } from "http";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieHeaderValue = req.headers.get("cookie");
  const headers: Partial<{
    headers?: IncomingHttpHeaders;
  }> = {};

  if (cookieHeaderValue !== null) {
    headers.headers = { cookie: cookieHeaderValue };
  }

  const requestForNextAuth = headers;

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    const editUser = session?.user.role.abilities.some(
      (ability: any) => ability.slug === "editUser"
    );

    const currentUser = req.nextUrl.pathname.startsWith(
      `/users/${session.user.id}`
    );

    if (!editUser && !currentUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/users/:id/edit/:path*"] };
