"use client";

import { useState } from "react";

type ScrapItem = {
  id: string;
  name: string;
  unit: string;
};

const SCRAP_ITEMS: ScrapItem[] = [
  { id: "paper", name: "Paper", unit: "kg" },
  { id: "plastic", name: "Plastic", unit: "kg" },
  { id: "metal", name: "Metal", unit: "kg" },
  { id: "electronics", name: "E-Waste", unit: "kg" },
];

const NGOs = [
  { id: "ngo1", name: "Green Earth Foundation" },
  { id: "ngo2", name: "Clean City Initiative" },
  { id: "ngo3", name: "Recycle for Change" },
];

export default function DonateScrapPage() {
  const [selectedNgo, setSelectedNgo] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* PAGE HEADER */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-primary">
          Donate Scrap
        </h1>
        <p className="mt-3 text-secondary">
          Donate your scrap to verified NGOs partnered with SocietySalvor.
          We ensure transparent collection, weighing, and impact reporting.
        </p>
      </header>

      {/* NGO SELECTION */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-primary">
          Choose an NGO
        </h2>
        <p className="mt-2 text-sm text-muted max-w-2xl">
          Your donated scrap will be routed to the selected NGO through
          authorised channels to ensure genuine social impact.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {NGOs.map((ngo) => (
            <button
              key={ngo.id}
              onClick={() => setSelectedNgo(ngo.id)}
              className={`text-left border rounded-lg p-4 transition ${
                selectedNgo === ngo.id
                  ? "border-accent bg-green-50"
                  : "border-border bg-white hover:bg-surface"
              }`}
            >
              <p className="font-medium text-primary">{ngo.name}</p>
              <p className="mt-1 text-sm text-muted">
                Verified partner NGO
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* SCRAP ITEMS */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-primary">
          Scrap Items for Donation
        </h2>
        <p className="mt-2 text-sm text-muted max-w-2xl">
          Select the scrap items you wish to donate. Final quantities
          are recorded after weighing during pickup.
        </p>

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

      {/* SCHEDULE PICKUP */}
      <section className="mt-16 max-w-xl">
        <h2 className="text-lg font-medium text-primary">
          Schedule Donation Pickup
        </h2>
        <p className="mt-2 text-sm text-muted">
          Our team will review the details and coordinate pickup
          at a convenient time.
        </p>

        <div className="mt-4 space-y-4">
          <input className="input" placeholder="Full name" />
          <input className="input" placeholder="Phone number" />
          <input className="input" placeholder="Pickup address" />
          <input type="date" className="input" />

          <button
            disabled={!selectedNgo}
            className={`w-full px-6 py-3 rounded-md font-medium transition ${
              selectedNgo
                ? "bg-accent text-white hover:opacity-90"
                : "bg-surface text-muted cursor-not-allowed"
            }`}
          >
            Submit Donation Request
          </button>

          {!selectedNgo && (
            <p className="text-xs text-muted">
              Please select an NGO before submitting.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
