// src/components/ScrapItemForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ScrapItemForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const res = await fetch("/api/scrap-items/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Scrap item created!");
      router.push("/admin/scrap-items");
      router.refresh();
    } else {
      toast.error(data.error || "Failed to create item");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="grid md:grid-cols-3 gap-4">
      <input
        name="name"
        placeholder="Item name (e.g., Newspaper)"
        required
        className="px-4 py-2 border rounded-lg"
      />

      <select name="unit" required className="px-4 py-2 border rounded-lg">
        <option value="KG">KG</option>
        <option value="PIECE">PIECE</option>
      </select>

      <input
        name="basePrice"
        type="number"
        step="0.01"
        placeholder="Base price"
        required
        className="px-4 py-2 border rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Add Item"}
      </button>
    </form>
  );
}