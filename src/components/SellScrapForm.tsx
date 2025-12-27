// src/components/SellScrapForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type ScrapItem = {
  id: string;
  name: string;
  unit: "KG" | "PIECE";
  basePrice: number;
};

type Event = {
  id: string;
  name: string;
  school: { name: string };
};

type Props = {
  items: ScrapItem[];
  ongoingEvents: Event[];
};

export default function SellScrapForm({ items, ongoingEvents }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedEventId = searchParams.get("eventId");
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ itemId: string; quantity: number }[]>([]);

  const handleQuantityChange = (itemId: string, qty: string) => {
    const quantity = parseFloat(qty) || 0;
    if (quantity === 0) {
      setSelectedItems(selectedItems.filter((i) => i.itemId !== itemId));
    } else {
      setSelectedItems((prev) => {
        const existing = prev.find((i) => i.itemId === itemId);
        if (existing) {
          return prev.map((i) => (i.itemId === itemId ? { ...i, quantity } : i));
        }
        return [...prev, { itemId, quantity }];
      });
    }
  };

  async function handleSubmit(formData: FormData) {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    setLoading(true);

    selectedItems.forEach((si, index) => {
      formData.append(`items[${index}][itemId]`, si.itemId);
      formData.append(`items[${index}][quantity]`, si.quantity.toString());
    });

    const res = await fetch("/api/orders/sell", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order submitted successfully!");
      router.push(`/sell/success?trackingId=${data.publicId}`);
    } else {
      toast.error(data.error || "Submission failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Optional Event Selection */}
      {ongoingEvents.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Join EcoChamp Event (Optional)</h2>
          <select
            name="eventId"
            defaultValue={preselectedEventId || ""}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="">Regular Sell (No Event)</option>
            {ongoingEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.school.name})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Items Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Scrap Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.basePrice} per {item.unit === "KG" ? "kg" : "piece"}
                  </p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                step={item.unit === "KG" ? "0.5" : "1"}
                placeholder={`Estimated ${item.unit === "KG" ? "kg" : "pieces"}`}
                className="w-full px-4 py-3 border rounded-lg text-lg"
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pickup Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Pickup Details</h2>
        <div className="space-y-4">
          <input name="contactName" type="text" placeholder="Full Name" required className="w-full px-4 py-3 border rounded-lg" />
          <input name="contactPhone" type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 border rounded-lg" />
          <textarea name="pickupAddress" placeholder="Full Pickup Address (with landmark)" rows={4} required className="w-full px-4 py-3 border rounded-lg" />
          <input
            name="pickupDate"
            type="date"
            min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || selectedItems.length === 0}
        className="w-full bg-green-600 text-white py-5 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Schedule Free Pickup"}
      </button>
    </form>
  );
}