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

  const session = await getSession({ req: headers });

  const pathname = req.nextUrl.pathname;

  if (session) {
    const editUser = session?.user.role.abilities.some(
      (ability: any) => ability.slug === "editUser"
    );

    const pageBelong = pathname.startsWith(`/users/${session.user.id}`);

    if (!editUser && !pageBelong && pathname.includes("edit")) {
      return NextResponse.error();
    }

    if (!pageBelong && pathname.includes("notifications")) {
      return NextResponse.error();
    }
  } else {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:id/edit/:path*", "/users/:id/notifications"],
};
