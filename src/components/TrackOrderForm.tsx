// src/components/TrackOrderForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrackOrderForm() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    const upperId = trackingId.toUpperCase().trim();
    router.push(`/track/${upperId}`);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID (e.g., SSABC123)"
          className="flex-1 px-4 py-3 border rounded-lg text-lg uppercase"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>
    </div>
  );
}