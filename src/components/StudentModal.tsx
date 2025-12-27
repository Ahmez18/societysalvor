// src/components/StudentModal.tsx
"use client";

import { useState } from "react";

type Participation = {
  student: {
    id: string;
    name: string | null;
    email: string;
  };
};

type Event = {
  id: string;
  name: string;
  date: Date | null;
  type: "SELL" | "DONATION";
  participations: Participation[];
};

type Props = {
  event: Event;
  children: React.ReactNode;
};

export default function StudentModal({ event, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold mb-6">{event.name}</h2>
            <p className="text-gray-600 mb-4">
              {event.date ? new Date(event.date).toLocaleDateString() : "Date TBD"} • {event.type}
            </p>
            <p className="text-xl font-semibold mb-6">
              Total Participants: {event.participations.length}
            </p>

            {event.participations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No students joined yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.participations.map((p) => (
                      <tr key={p.student.id} className="border-t">
                        <td className="p-4">{p.student.name || "No name"}</td>
                        <td className="p-4">{p.student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}