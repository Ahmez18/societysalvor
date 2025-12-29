// src/components/ClientNavbar.tsx
"use client";

import Link from "next/link";
import { logout } from "@/actions/authActions";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  initialRole: string;
  initialUser: { id: string; role: string } | null;
};

function NavLink({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "text-sm font-medium transition-colors",
        active ? "text-green-700" : "text-slate-700 hover:text-slate-900",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function ClientNavbar({ initialRole, initialUser }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll-aware navbar (hide on scroll down, show on slight scroll up)
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const role = initialRole;
  const user = initialUser;

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;

      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;
          const delta = y - lastY;

          // Hide on scroll down after a small threshold
          if (delta > 10 && y > 80) setHidden(true);

          // Show on slight scroll up
          if (delta < -10) setHidden(false);

          lastYRef.current = y;
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-slate-200/70 bg-white/80 backdrop-blur",
        "transition-transform duration-200",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700 ring-1 ring-green-100">
              SS
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              SocietySalvor
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {role === "GUEST" && (
              <>
                <NavLink href="/sell" active={isActive("/sell")}>
                  Sell Scrap
                </NavLink>
                <NavLink href="/donate" active={isActive("/donate")}>
                  Donate Scrap
                </NavLink>
                <NavLink href="/vehicle" active={isActive("/vehicle")}>
                  Sell Vehicle
                </NavLink>
                <NavLink href="/track" active={isActive("/track")}>
                  Track Order
                </NavLink>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <NavLink href="/admin" active={isActive("/admin")}>
                  Admin Dashboard
                </NavLink>
                <NavLink href="/admin/scrap-items" active={isActive("/admin/scrap-items")}>
                  Scrap Items
                </NavLink>
                <NavLink href="/admin/ngos" active={isActive("/admin/ngos")}>
                  NGOs
                </NavLink>
                <NavLink href="/admin/vehicle" active={isActive("/admin/vehicle")}>
                  Vehicle
                </NavLink>
              </>
            )}

            {role === "SCHOOL" && (
              <>
                <NavLink href="/ecochamp/school" active={isActive("/ecochamp/school")}>
                  School Dashboard
                </NavLink>
                <NavLink href="/ecochamp/school/events" active={isActive("/ecochamp/school/events")}>
                  My Events
                </NavLink>
              </>
            )}

            {role === "STUDENT" && (
              <>
                <NavLink href="/ecochamp/student" active={isActive("/ecochamp/student")}>
                  My Dashboard
                </NavLink>
                <NavLink href="/ecochamp/student/upcoming" active={isActive("/ecochamp/student/upcoming")}>
                  Upcoming Events
                </NavLink>
                <NavLink
                  href="/ecochamp/student/participated"
                  active={isActive("/ecochamp/student/participated")}
                >
                  Certificates
                </NavLink>
              </>
            )}

            {role === "NGO" && (
              <>
                <NavLink href="/ngo/dashboard" active={isActive("/ngo/dashboard")}>
                  NGO Dashboard
                </NavLink>
                <NavLink href="/ngo/profile" active={isActive("/ngo/profile")}>
                  My Profile
                </NavLink>
              </>
            )}

            {role === "REP" && (
              <>
                <NavLink href="/rep/dashboard" active={isActive("/rep/dashboard")}>
                  Assigned Pickups
                </NavLink>
              </>
            )}

            {user && (
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Logout
                </button>
              </form>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              {role === "GUEST" && (
                <>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/sell">
                    Sell Scrap
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/donate">
                    Donate Scrap
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/vehicle">
                    Sell Vehicle
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/track">
                    Track Order
                  </Link>
                </>
              )}

              {role === "ADMIN" && (
                <>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/admin">
                    Admin Dashboard
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/admin/scrap-items">
                    Scrap Items
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/admin/ngos">
                    NGOs
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/admin/vehicle">
                    Vehicle
                  </Link>
                </>
              )}

              {role === "SCHOOL" && (
                <>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ecochamp/school">
                    School Dashboard
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ecochamp/school/events">
                    My Events
                  </Link>
                </>
              )}

              {role === "STUDENT" && (
                <>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ecochamp/student">
                    My Dashboard
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ecochamp/student/upcoming">
                    Upcoming Events
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ecochamp/student/participated">
                    Certificates
                  </Link>
                </>
              )}

              {role === "NGO" && (
                <>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ngo/dashboard">
                    NGO Dashboard
                  </Link>
                  <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/ngo/profile">
                    My Profile
                  </Link>
                </>
              )}

              {role === "REP" && (
                <Link className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-slate-50" href="/rep/dashboard">
                  Assigned Pickups
                </Link>
              )}

              {user && (
                <form action={logout} className="pt-1">
                  <button
                    type="submit"
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
