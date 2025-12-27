// src/components/AdminEventList.tsx
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function markCompleted(id: string) {
  "use server";

  await prisma.event.update({
    where: { id },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/admin/ecochamp");
}

export default async function AdminEventList({ events }: { events: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Event</th>
            <th className="p-4">School</th>
            <th className="p-4">Type</th>
            <th className="p-4">NGO</th>
            <th className="p-4">Status</th>
            <th className="p-4">Participants</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t">
              <td className="p-4">
                <div className="font-medium">{event.name}</div>
                <div className="text-sm text-gray-600">
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </div>
              </td>
              <td className="p-4">{event.school.name}</td>
              <td className="p-4">{event.type}</td>
              <td className="p-4">{event.ngo ? event.ngo.name : "-"}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${event.status === "COMPLETED" ? "bg-teal-100 text-teal-800" : "bg-blue-100 text-blue-800"}`}>
                  {event.status}
                </span>
              </td>
              <td className="p-4">{event.orders.length}</td>
              <td className="p-4">
                {event.status === "ONGOING" && (
                  <form action={markCompleted.bind(null, event.id)}>
                    <button type="submit" className="text-green-600 hover:underline">
                      Mark Completed
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}