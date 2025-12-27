// src/components/StudentRegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function checkCode() {
    if (!code.trim()) return;

    const res = await fetch("/api/ecochamp/validate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.toUpperCase().trim() }),
    });

    const data = await res.json();

    if (data.valid) {
      setSchoolName(data.schoolName);
      setError("");
    } else {
      setSchoolName(null);
      setError("Invalid school code. Please check with your school.");
    }
  }

  async function handleSubmit(formData: FormData) {
    if (!schoolName) {
      setError("Please validate your school code first");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/ecochamp/student/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      router.push("/ecochamp/login?registered=student");
    } else {
      alert(data.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* School Code Input */}
      <div>
        <label className="block text-lg font-medium mb-2">School Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., ECO-ABCD1234"
            className="flex-1 px-4 py-3 border rounded-lg uppercase"
            required
          />
          <button
            type="button"
            onClick={checkCode}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Validate
          </button>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {schoolName && <p className="text-green-600 mt-2">Valid! School: <strong>{schoolName}</strong></p>}
      </div>

      {/* Registration Form (shown only after valid code) */}
      {schoolName && (
        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="code" value={code.toUpperCase().trim()} />

          <input
            name="name"
            placeholder="Your Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      )}
    </div>
  );
}