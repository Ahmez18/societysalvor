// src/components/RepForm.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function RepForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const password = formData.get("password") as string;
    const confirm = formData.get("confirmPassword") as string;

    if (password !== confirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/rep/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Rep created successfully!");
      window.location.reload();
    } else {
      toast.error(data.error || "Failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6 max-w-lg">
      <input name="name" placeholder="Full Name" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="email" type="email" placeholder="Email (login)" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="phone" type="tel" placeholder="Phone" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="password" type="password" placeholder="Password" required minLength={8} className="w-full px-4 py-3 border rounded-lg" />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" required className="w-full px-4 py-3 border rounded-lg" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Rep"}
      </button>
    </form>
  );
}