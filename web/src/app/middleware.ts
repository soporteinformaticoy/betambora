import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    "";

  if (token && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/mapa", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
