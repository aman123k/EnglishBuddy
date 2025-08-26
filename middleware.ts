import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("EnglishBuddyToken")?.value;

  // Allow static/internal
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Route groups
  const publicPaths = ["/login", "/get-started", "/callback", "/survey"];

  // redirect away when authed + complete
  const authPages = ["/login", "/survey", "/get-started", "/callback"];

  const isIn = (paths: string[]) => paths.some((p) => pathname.startsWith(p));

  // Unauthed can access public
  if (!token && isIn(publicPaths)) return NextResponse.next();

  // Unauthed anywhere else → login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_KEY ?? "");
    const { payload } = await jwtVerify(token, secret);
    const { isSurveyComplete } = payload as JWTPayload & {
      isSurveyComplete?: boolean;
    };

    // Incomplete survey → only allow survey flow
    if (isSurveyComplete === false && !isIn(publicPaths)) {
      const url = req.nextUrl.clone();
      url.pathname = "/survey";
      return NextResponse.redirect(url);
    }

    // Completed survey → block auth pages
    if (isSurveyComplete === true && isIn(authPages)) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    // Token invalid → login (except on public)
    console.log(err);
    if (!isIn(publicPaths)) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes
  matcher: ["/", "/login", "/survey", "/get-started"],
};
