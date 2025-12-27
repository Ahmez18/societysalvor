// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocietySalvor",
  description: "Scrap collection and donation operations platform",
};

async function getRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getRole();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}