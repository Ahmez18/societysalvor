// src/components/RedirectHandler.tsx
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

async function getRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return "GUEST";

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return payload.role as string;
  } catch {
    return "GUEST";
  }
}

export async function RedirectHandler() {
  const role = await getRole();

  const headerList = await headers();
  const pathname = headerList.get("x-nextjs-url") || 
                   headerList.get("next-url") || 
                   "/";

  // Define paths clearly
  const isOnHomeOrPublicFlow = [
    "/", "/sell", "/donate", "/track", "/login", "/ngos"
  ].some(p => pathname.startsWith(p));

  const isOnProtectedDashboard = [
    "/admin", "/rep", "/school", "/student"
  ].some(p => pathname.startsWith(p));

  // Rule 1: Logged-in users must not browse public pages → redirect to their dashboard
  if (role !== "GUEST" && isOnHomeOrPublicFlow) {
    if (role === "ADMIN") redirect("/admin");
    if (role === "REP") redirect("/rep");
    if (role === "SCHOOL") redirect("/school");
    if (role === "STUDENT") redirect("/student");
    redirect("/"); // fallback
  }

  // Rule 2: Guests must not access protected dashboards → redirect to home
  if (role === "GUEST" && isOnProtectedDashboard) {
    redirect("/");
  }

  // If we're here, no redirect needed
  return null;
}