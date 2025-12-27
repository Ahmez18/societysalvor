// src/components/ClientNavbar.tsx
"use client";

import Link from "next/link";
import { logout } from "@/actions/authActions";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type Props = {
  initialRole: string;
  initialUser: { id: string; role: string } | null;
};

export default function ClientNavbar({ initialRole, initialUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const role = initialRole;
  const user = initialUser;

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            SocietySalvor
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {role === "GUEST" && (
              <>
                <Link href="/sell" className="hover:underline">Sell Scrap</Link>
                <Link href="/donate" className="hover:underline">Donate Scrap</Link>
                <Link href="/vehicle" className="hover:underline">Sell Vehicle</Link>
                <Link href="/track" className="hover:underline">Track Order</Link>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <Link href="/admin" className="hover:underline">Admin Dashboard</Link>
                <Link href="/admin/scrap-items" className="hover:underline">Scrap Items</Link>
              </>
            )}
            {role === "SCHOOL" && (
            <>
            <Link href="/ecochamp/school" className="hover:underline">School Dashboard</Link>
            <Link href="/ecochamp/school/events" className="hover:underline">My Events</Link>
            </>
            )}
            {role === "NGO" && (
  <>
    <Link href="/ngo/dashboard" className="hover:underline">NGO Dashboard</Link>
    <Link href="/ngo/profile" className="hover:underline">My Profile</Link>
  </>
)}

            {role === "STUDENT" && (
            <>
                <Link href="/ecochamp/student" className="hover:underline">My Dashboard</Link>
                <Link href="/ecochamp/student/upcoming" className="hover:underline">Upcoming Events</Link>
                <Link href="/ecochamp/student/participated" className="hover:underline">Participated Events & Certificates</Link>
            </>
            )}

            {role === "REP" && (
  <>
    <Link href="/rep/dashboard" className="hover:underline">Assigned Pickups</Link>
  </>
)}
            {user && (
            <form action={logout}>
                <button type="submit" className="hover:underline">
                Logout ({role === "SCHOOL" ? "School" : role === "STUDENT" ? "Student" : "Admin"})
                </button>
            </form>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-green-700 border-t border-green-600">
            <div className="flex flex-col items-center gap-4 py-4">
              {role === "GUEST" && (
                <>
                  <Link href="/sell" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Sell Scrap
                  </Link>
                  <Link href="/donate" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Donate Scrap
                  </Link>
                  
                  <Link href="/vehicle" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Sell Vehicle
                  </Link>
                  <Link href="/track" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Track Order
                  </Link>
                </>
              )}

              {role === "ADMIN" && (
                <>
                  <Link href="/admin" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                  </Link>
                  <Link href="/admin/scrap-items" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                    Scrap Items
                  </Link>
                </>
              )}
            {role === "SCHOOL" && (
            <>
                <Link href="/ecochamp/school" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                School Dashboard
                </Link>
                <Link href="/ecochamp/school/events" className="text-lg hover:underline" onClick={() => setIsOpen(false)}>
                Manage Events
                </Link>
            </>
            )}
            {role === "NGO" && (
            <>
              <Link href="/ngo/dashboard" className="block hover:underline">NGO Dashboard</Link>
              <button onClick={logout} className="block hover:underline">Logout (NGO)</button>
            </>
          )}
          {role === "REP" && (
            <>
              <Link href="/rep/dashboard" className="block hover:underline">Assigned Pickups</Link>
              <button onClick={logout} className="block hover:underline">Logout (Rep)</button>
            </>
          )}
              {user && (
                <form action={logout} className="mt-2">
                  <button
                    type="submit"
                    className="text-lg hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout (Admin)
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