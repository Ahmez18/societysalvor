// src/components/NGORegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NGORegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/ngo/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("NGO registration successful! Awaiting admin approval.");
      router.push("/ngo/login");
    } else {
      toast.error(data.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">NGO Registration</h2>

      {/* NGO Public Identity */}
      <input name="name" placeholder="NGO Display Name" required className="w-full px-4 py-3 border rounded-lg" />
      <textarea name="description" placeholder="Short Description (2–3 lines)" rows={4} required className="w-full px-4 py-3 border rounded-lg" />
      <input name="logo" placeholder="Logo URL (optional)" className="w-full px-4 py-3 border rounded-lg" />
      <input name="website" placeholder="Website URL (optional)" className="w-full px-4 py-3 border rounded-lg" />

      {/* NGO Legitimacy */}
      <input name="registrationNumber" placeholder="NGO Registration Number" required className="w-full px-4 py-3 border rounded-lg" />
      <select name="type" required className="w-full px-4 py-3 border rounded-lg">
        <option value="">Select NGO Type</option>
        <option value="TRUST">Trust</option>
        <option value="SOCIETY">Society</option>
        <option value="FOUNDATION">Foundation</option>
        <option value="OTHER">Other</option>
      </select>
      <textarea name="address" placeholder="Registered Address" rows={3} required className="w-full px-4 py-3 border rounded-lg" />

      {/* NGO User Account */}
      <input name="email" type="email" placeholder="Login Email" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="phone" type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 border rounded-lg" />
      <input name="password" type="password" placeholder="Password" required minLength={8} className="w-full px-4 py-3 border rounded-lg" />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" required className="w-full px-4 py-3 border rounded-lg" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Register NGO"}
      </button>
    </form>
  );
}