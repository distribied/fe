import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";

function getSessionFromRequest(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_COOKIE_NAME);
  return session?.value === "authenticated";
}

export async function middleware(req: NextRequest) {
  // Skip auth check for login page and API routes
  if (
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname.startsWith("/api/admin")
  ) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const isAuthenticated = getSessionFromRequest(req);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
