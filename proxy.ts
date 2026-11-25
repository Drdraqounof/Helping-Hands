import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "./lib/auth-token";

// First line of defense: bounce signed-out visitors away from /admin.
// Admin pages and actions re-check the session on the server (lib/session.ts).
export async function proxy(request: NextRequest) {
  const ok = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
