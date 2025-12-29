"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Sell Scrap", href: "/sell" },
  { label: "Donate Scrap", href: "/donate" },
  { label: "Scrap Prices", href: "/scrap-prices" },
  { label: "NGO Partners", href: "/ngos" },
  { label: "Vehicle Scrap", href: "/vehicle-scrap" },
  { label: "Track Order", href: "/track" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="text-lg font-semibold text-primary"
            >
              SocietySalvor
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition ${
                    pathname === link.href
                      ? "text-primary font-medium"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/sell"
                className="ml-4 bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
              >
                Schedule Pickup
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-secondary hover:bg-surface"
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>

          {/* MOBILE MENU */}
          {mobileOpen && (
            <div className="md:hidden border-t border-border bg-white">
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm ${
                      pathname === link.href
                        ? "text-primary font-medium"
                        : "text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/sell"
                  className="mt-2 inline-flex justify-center bg-accent text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Schedule Pickup
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* SPACER */}
      <div className="h-16" />
    </>
  );
}
