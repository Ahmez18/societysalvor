// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("loggedout") === "true") {
      toast.success("Logged out successfully!");
    }
  }, [searchParams]);
  // Rest of your home page code
   return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-green-700 mb-8">
        SocietySalvor
      </h1>
      <p className="text-xl mb-12">
        Hassle-free scrap collection. Sell or donate responsibly.
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <a href="/sell" className="block p-8 bg-blue-600 text-white rounded-lg text-2xl hover:bg-blue-700">
          Sell Scrap → Earn Money
        </a>
        <a href="/donate" className="block p-8 bg-green-600 text-white rounded-lg text-2xl hover:bg-green-700">
          Donate Scrap → Help NGOs
        </a>
      </div>
    </div>
  );
}
