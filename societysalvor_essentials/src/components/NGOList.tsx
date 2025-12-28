// src/components/NGOList.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type NGO = {
  id: string;
  name: string;
  description: string;
  status: string;
};

type Props = {
  initialNGOs: NGO[];
};

export default function NGOList({ initialNGOs }: Props) {
  const router = useRouter();

  async function handleToggle(id: string, currentStatus: string) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("currentStatus", currentStatus);

    const res = await fetch("/api/ngo/toggle-status", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success(`NGO ${currentStatus === "APPROVED" ? "suspended" : "approved"}`);
      router.refresh();
    } else {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-6">
      {initialNGOs.map((ngo) => (
        <div key={ngo.id} className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{ngo.name}</h3>
            <p className="text-gray-600">{ngo.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Status: <span className={ngo.status === "APPROVED" ? "text-green-600" : "text-red-600"}>{ngo.status}</span>
            </p>
          </div>

          <button
            onClick={() => handleToggle(ngo.id, ngo.status)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {ngo.status === "APPROVED" ? "Suspend" : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}