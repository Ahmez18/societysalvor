// src/components/SellScrapForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onSelectionChange: (hasSelection: boolean) => void;
  onScheduleClick: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
};

export default function SellScrapForm({
  onSelectionChange,
  onScheduleClick,
  formRef,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [formVisible, setFormVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const items = [
    { id: "paper", name: "Paper" },
    { id: "plastic", name: "Plastic" },
    { id: "metal", name: "Metal" },
    { id: "ewaste", name: "E-waste" },
  ];

  const updateQuantity = (id: string, qty: number) => {
    const next = { ...selectedItems };
    if (qty <= 0) delete next[id];
    else next[id] = qty;

    setSelectedItems(next);
    onSelectionChange(Object.keys(next).length > 0);
  };

  // Observe form visibility
  useEffect(() => {
    if (!formRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observerRef.current.observe(formRef.current);
    return () => observerRef.current?.disconnect();
  }, [formRef]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-28">
      {/* ITEM SELECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-6 bg-white"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{item.name}</span>
              <input
                type="number"
                min={0}
                className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
            </div>
          </div>
        ))}
      </section>

      {/* SCHEDULE FORM */}
      <div ref={formRef} className="mt-24">
        <h2 className="text-2xl font-semibold text-gray-900">
          Schedule Pickup
        </h2>
        <p className="mt-2 text-gray-600">
          Pickup date, time, and address are confirmed after review.
        </p>

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Full Name" className="input" />
          <input placeholder="Phone Number" className="input" />

          <input placeholder="Pickup Date" type="date" className="input" />
          <select className="input">
            <option>Select Time Slot</option>
            <option>Morning (9am – 12pm)</option>
            <option>Afternoon (12pm – 4pm)</option>
            <option>Evening (4pm – 7pm)</option>
          </select>

          <input
            placeholder="Address Line"
            className="input md:col-span-2"
          />
          <input placeholder="Landmark (optional)" className="input" />
          <input placeholder="Pincode" className="input" />

          <textarea
            placeholder="Additional notes (optional)"
            className="input md:col-span-2 h-24"
          />

          <button
            type="submit"
            className="md:col-span-2 mt-4 rounded-md bg-gray-900 text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
          >
            Schedule Pickup
          </button>
        </form>
      </div>
    </div>
  );
}
