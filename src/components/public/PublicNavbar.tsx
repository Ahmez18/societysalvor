// src/components/public/PublicNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import useHideOnScroll from "./useHideOnScroll";

export default function PublicNavbar() {
  const visible = useHideOnScroll(12);
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/sell">Sell Scrap</Link>
      <Link href="/donate">Donate Scrap</Link>
      <Link href="/scrap-prices">Scrap Prices</Link>
      <Link href="/ngos">NGO Partners</Link>
      <Link href="/vehicle-scrap">Vehicle Scrap</Link>
      <Link href="/track">Track Order</Link>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            SocietySalvor
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex gap-6 text-sm text-gray-700">
            <NavLinks />
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-4 text-sm text-gray-700">
            <NavLinks />
          </div>
        )}
      </nav>
    </header>
  );
}
