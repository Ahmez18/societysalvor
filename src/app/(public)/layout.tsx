// src/app/(public)/layout.tsx
"use client";

import type { ReactNode } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import WhatsAppFloat from "@/components/public/WhatsAppFloat";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Public chrome */}
      <PublicNavbar />

      {/* Page content */}
      <main className="min-h-screen bg-white">
        {children}
      </main>

      {/* Footer */}
      <PublicFooter />

      {/* Global public-only helper */}
      <WhatsAppFloat />
    </>
  );
}
