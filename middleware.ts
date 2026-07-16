import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("lingo_logged_in");
  const { pathname } = request.nextUrl;

  const allowedPaths = [
    "/get-started",
    "/survey",
    "/login",
    "/forgot-password",
    "/forgot-password/sent",
    "/callback",
  ];

  const isPublicPath = allowedPaths.includes(pathname);

  // If the path is not public and there is no cookie, redirect to /login
  if (!isPublicPath && !cookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the path is public and the user is logged in, redirect them away from login/get-started to home
  if (isPublicPath && cookie) {
    if (pathname === "/login" || pathname === "/get-started" || pathname === "/forgot-password") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Config matching all paths except Next.js internals, API, public files
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|Images|favicon.ico).*)",
  ],
};
