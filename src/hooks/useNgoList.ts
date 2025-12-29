"use client";

import { useEffect, useState } from "react";

export type Ngo = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string | null;
  website: string | null;
  address: string;
  type: "CHARITY" | "FOUNDATION" | "TRUST" | "OTHER";
};

export function useNgoList() {
  const [ngos, setNgos] = useState<Ngo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchNgos() {
      try {
        const res = await fetch("/api/ngos", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load NGOs");

        const data = await res.json();
        if (!active) return;

        setNgos(data.ngos ?? []);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError("Unable to fetch NGOs");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchNgos();
    return () => {
      active = false;
    };
  }, []);

  return { ngos, loading, error };
}
