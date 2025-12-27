// src/components/JoinEventButton.tsx
"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  eventId: string;
  joined: boolean;
};

export default function JoinEventButton({ eventId, joined }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    setLoading(true);

    const res = await fetch("/api/ecochamp/join-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Successfully joined the event!");
      window.location.reload();
    } else {
      toast.error(data.error || "Failed to join");
      setLoading(false);
    }
  }

  if (joined) {
    return <p className="text-green-600 font-bold text-center text-xl">Already Joined!</p>;
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
    >
      {loading ? "Joining..." : "Join Event"}
    </button>
  );
}