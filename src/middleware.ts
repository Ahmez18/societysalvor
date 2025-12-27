// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRoleFromToken(request: NextRequest): string {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) return "GUEST";

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return payload.role || "GUEST";
  } catch {
    return "GUEST";
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = getRoleFromToken(request);

  const protectedPaths = ["/admin", "/rep", "/school", "/student", "/ecochamp/school", "/ecochamp/student"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  // ONLY protect dashboards from guests
  if (role === "GUEST" && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow everything else (including logged-in users on public pages)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};