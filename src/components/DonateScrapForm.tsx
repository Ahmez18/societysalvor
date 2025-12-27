// src/components/DonateScrapForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDonateOrder } from "@/actions/orderActions";

type ScrapItem = {
  id: string;
  name: string;
  unit: "KG" | "PIECE";
  basePrice: number;
};

type NGO = {
  id: string;
  name: string;
  description: string | null;
};

type Props = {
  items: ScrapItem[];
  ngos: NGO[];
};

export default function DonateScrapForm({ items, ngos }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<
    { itemId: string; quantity: number }[]
  >([]);

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
    if (!selectedNGO) {
      alert("Please select an NGO");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    setLoading(true);
    formData.append("ngoId", selectedNGO);

    selectedItems.forEach((si, index) => {
      formData.append(`items[${index}][itemId]`, si.itemId);
      formData.append(`items[${index}][quantity]`, si.quantity.toString());
    });

    const result = await createDonateOrder(formData);

    if (result.success) {
      router.push(`/donate/success?trackingId=${result.publicId}&ngo=${selectedNGO}`);
    } else {
      alert(result.error || "Submission failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* NGO Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Choose NGO</h2>
        <select
          value={selectedNGO}
          onChange={(e) => setSelectedNGO(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg text-lg"
        >
          <option value="">Select an NGO</option>
          {ngos.map((ngo) => (
            <option key={ngo.id} value={ngo.id}>
              {ngo.name}
            </option>
          ))}
        </select>
        {selectedNGO && ngos.find(n => n.id === selectedNGO)?.description && (
          <p className="mt-3 text-gray-600">
            {ngos.find(n => n.id === selectedNGO)?.description}
          </p>
        )}
      </div>

      {/* Scrap Items (same as Sell) */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Scrap Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <input
                type="number"
                min="0"
                step={item.unit === "KG" ? "0.5" : "1"}
                placeholder={`Estimated ${item.unit === "KG" ? "kg" : "pieces"}`}
                className="w-full px-4 py-3 border rounded-lg text-lg mt-2"
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
          <textarea name="pickupAddress" placeholder="Full Address" rows={4} required className="w-full px-4 py-3 border rounded-lg" />
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
        disabled={loading || !selectedNGO || selectedItems.length === 0}
        className="w-full bg-green-600 text-white py-5 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Schedule Donation Pickup"}
      </button>
    </form>
  );
}