// src/components/VehicleScrapForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VehicleScrapForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const res = await fetch("/api/vehicle/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/vehicle/success?leadId=${data.publicId}`);
    } else {
      alert("Submission failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="make" placeholder="Make (e.g., Maruti)" required className="px-4 py-3 border rounded-lg" />
        <input name="model" placeholder="Model (e.g., Swift)" required className="px-4 py-3 border rounded-lg" />
        <input name="year" type="number" min="1900" max={new Date().getFullYear()} placeholder="Year" required className="px-4 py-3 border rounded-lg" />
        <select name="condition" required className="px-4 py-3 border rounded-lg">
          <option value="">Condition</option>
          <option>Running</option>
          <option>Not Running</option>
          <option>Accident</option>
          <option>Scrap Only</option>
        </select>
      </div>

      <input name="phone" type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="location" placeholder="City / Area" required className="w-full px-4 py-3 border rounded-lg" />
      <textarea name="notes" placeholder="Additional notes (optional)" rows={4} className="w-full px-4 py-3 border rounded-lg" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-5 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Get Quote & Free Pickup"}
      </button>
    </form>
  );
}