// src/app/admin/ecochamp/page.tsx
import { prisma } from "@/lib/prisma";
import AdminEventList from "@/components/AdminEventList";

async function getEvents() {
  return prisma.event.findMany({
    include: {
      school: true,
      ngo: true,
      orders: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminEcoChampPage() {
  const events = await getEvents();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">EcoChamp Event Management</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">All Events</h2>
        <AdminEventList events={events} />
      </div>
    </div>
  );
}