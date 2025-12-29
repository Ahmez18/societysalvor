"use client";

import { useEffect, useState } from "react";

export type ScrapItem = {
  id: string;
  name: string;
  unit: "KG" | "PIECE";
  basePrice: number;
};

export function useScrapItems() {
  const [items, setItems] = useState<ScrapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      try {
        const res = await fetch("/api/scrap-items", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load scrap items");

        const data = await res.json();
        if (!active) return;

        setItems(data.items ?? []);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError("Unable to fetch scrap items");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchItems();
    return () => {
      active = false;
    };
  }, []);

  return { items, loading, error };
}
