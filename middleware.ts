import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // check token / role
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
