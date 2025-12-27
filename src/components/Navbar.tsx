// src/components/Navbar.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/actions/authActions";
import ClientNavbar from "@/components/ClientNavbar";

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return { user: null, role: "GUEST" };
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return { user: { id: payload.userId, role: payload.role }, role: payload.role };
  } catch {
    return { user: null, role: "GUEST" };
  }
}

async function ServerNavbar() {
  const { user, role } = await getSession();

  return <ClientNavbar initialRole={role} initialUser={user} />;
}

export default async function Navbar() {
  return <ServerNavbar />;
}