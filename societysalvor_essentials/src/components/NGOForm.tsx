// src/components/NGOForm.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  ngo?: any; // for edit
  onSuccess?: () => void;
};

export default function NGOForm({ ngo, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const res = await fetch(ngo ? `/api/ngo/${ngo.id}` : "/api/ngo", {
      method: ngo ? "PATCH" : "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success(ngo ? "NGO updated!" : "NGO created!");
      onSuccess?.();
    } else {
      toast.error(data.error || "Failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input name="name" defaultValue={ngo?.name} placeholder="NGO Name" required className="w-full px-4 py-3 border rounded-lg" />
      <textarea
        name="description"
        defaultValue={ngo?.description}
        placeholder="Description"
        rows={4}
        required
        className="w-full px-4 py-3 border rounded-lg"
      />
      <input name="logo" defaultValue={ngo?.logo || ""} placeholder="Logo URL" className="w-full px-4 py-3 border rounded-lg" />
      <input name="website" defaultValue={ngo?.website || ""} placeholder="Website" className="w-full px-4 py-3 border rounded-lg" />
      <input name="registrationNumber" defaultValue={ngo?.registrationNumber} placeholder="Registration Number" required className="w-full px-4 py-3 border rounded-lg" />
      <select name="type" defaultValue={ngo?.type} required className="w-full px-4 py-3 border rounded-lg">
        <option value="TRUST">Trust</option>
        <option value="SOCIETY">Society</option>
        <option value="FOUNDATION">Foundation</option>
        <option value="OTHER">Other</option>
      </select>
      <input name="address" defaultValue={ngo?.address} placeholder="Address" required className="w-full px-4 py-3 border rounded-lg" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : ngo ? "Update NGO" : "Create NGO"}
      </button>
    </form>
  );
}