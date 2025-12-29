"use client";

import { useEffect, useRef, useState } from "react";

type ScrapItem = {
  id: string;
  name: string;
  unit: string;
};

const SCRAP_ITEMS: ScrapItem[] = [
  { id: "paper", name: "Paper", unit: "kg" },
  { id: "plastic", name: "Plastic", unit: "kg" },
  { id: "iron", name: "Iron", unit: "kg" },
  { id: "aluminium", name: "Aluminium", unit: "kg" },
  { id: "electronics", name: "E-Waste", unit: "kg" },
];

export default function SellScrapPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const hasSelection = Object.values(quantities).some((q) => q > 0);

  useEffect(() => {
    setShowFloatingCTA(hasSelection);
  }, [hasSelection]);

  useEffect(() => {
    if (!formRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFloatingCTA(false);
        } else if (hasSelection) {
          setShowFloatingCTA(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, [hasSelection]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* PAGE HEADER */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-primary">
          Sell Scrap
        </h1>
        <p className="mt-3 text-secondary">
          Select the scrap items you want to sell. Final value is calculated
          after actual weighing during pickup.
        </p>
      </header>

      {/* SCRAP ITEM SELECTION */}
      <section className="mt-10">
        <h2 className="text-lg font-medium text-primary">
          Select Scrap Items
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SCRAP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg p-4 bg-white"
            >
              <p className="font-medium text-primary">{item.name}</p>
              <p className="text-sm text-muted mt-1">
                Quantity ({item.unit})
              </p>

              <input
                type="number"
                min={0}
                className="input mt-3"
                value={quantities[item.id] ?? ""}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [item.id]: Number(e.target.value),
                  })
                }
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE FORM */}
      <section ref={formRef} className="mt-16">
        <h2 className="text-lg font-medium text-primary">
          Schedule Pickup
        </h2>

        <div className="mt-4 max-w-xl">
          <div className="space-y-4">
            <input
              className="input"
              placeholder="Full name"
            />
            <input
              className="input"
              placeholder="Phone number"
            />
            <input
              className="input"
              placeholder="Pickup address"
            />
            <input
              type="date"
              className="input"
            />

            <button
              className="bg-accent text-white px-6 py-3 rounded-md font-medium hover:opacity-90"
            >
              Schedule Pickup
            </button>

            <p className="text-xs text-muted">
              Final payout is confirmed after weighing.
            </p>
          </div>
        </div>
      </section>

      {/* FLOATING CTA */}
      {showFloatingCTA && (
        <button
          onClick={() =>
            formRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 z-40 bg-accent text-white px-6 py-3 rounded-full font-medium shadow-lg hover:opacity-90"
        >
          Schedule Pickup
        </button>
      )}
    </div>
  );
}
