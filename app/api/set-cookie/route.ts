import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ success: true });

  if (token) {
    res.cookies.set("EnglishBuddyToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  } else {
    res.cookies.set("EnglishBuddyToken", "", { maxAge: 0 });
  }

  return res;
}
