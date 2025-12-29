// src/components/NGOForm.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  ngo?: any;
  onSuccess?: () => void;
};

export default function NGOForm({ ngo, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    // Prevent null description
    const description = formData.get("description") as string;
    if (!description) formData.set("description", "No description provided");

    const res = await fetch("/api/ngo/register", {  // Correct route
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("NGO created successfully!");
      onSuccess?.();
    } else {
      toast.error(data.error || "Failed to create NGO");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input name="name" placeholder="NGO Name" required className="w-full px-4 py-3 border rounded-lg" />
      <textarea name="description" placeholder="Description" rows={4} required className="w-full px-4 py-3 border rounded-lg" />
      <input name="logo" placeholder="Logo URL (optional)" className="w-full px-4 py-3 border rounded-lg" />
      <input name="website" placeholder="Website (optional)" className="w-full px-4 py-3 border rounded-lg" />
      <input name="registrationNumber" placeholder="Registration Number" required className="w-full px-4 py-3 border rounded-lg" />
      <select name="type" required className="w-full px-4 py-3 border rounded-lg">
        <option value="">Select Type</option>
        <option value="TRUST">Trust</option>
        <option value="SOCIETY">Society</option>
        <option value="FOUNDATION">Foundation</option>
        <option value="OTHER">Other</option>
      </select>
      <input name="address" placeholder="Address" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="email" type="email" placeholder="Login Email" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="phone" type="tel" placeholder="Phone" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="password" type="password" placeholder="Password" required minLength={8} className="w-full px-4 py-3 border rounded-lg" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create NGO"}
      </button>
    </form>
  );
}