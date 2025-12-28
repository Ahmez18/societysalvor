// src/components/EventForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createEvent } from "@/actions/eventActions";

type NGO = {
  id: string;
  name: string;
};

type Props = {
  ngos: NGO[];
};

export default function EventForm({ ngos }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"SELL" | "DONATION">("SELL");

  const minDate = new Date().toISOString().split("T")[0];

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const result = await createEvent(formData);

    if (result.success) {
      toast.success("Event created successfully!");
      router.push("/ecochamp/school/events");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to create event");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
      <input
        name="name"
        placeholder="Event Name (e.g., Eco Drive 2026)"
        required
        className="w-full px-4 py-3 border rounded-lg"
      />

      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value as "SELL" | "DONATION")}
        className="w-full px-4 py-3 border rounded-lg"
      >
        <option value="SELL">Sell Scrap</option>
        <option value="DONATION">Donate Scrap</option>
      </select>

      <input
        name="date"
        type="date"
        min={minDate}
        required
        className="w-full px-4 py-3 border rounded-lg"
      />

      {type === "DONATION" && (
        <select name="ngoId" className="w-full px-4 py-3 border rounded-lg">
          <option value="">Select NGO (optional)</option>
          {ngos.map((ngo) => (
            <option key={ngo.id} value={ngo.id}>
              {ngo.name}
            </option>
          ))}
        </select>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}