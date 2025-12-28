// src/app/ecochamp/school/create-event/page.tsx
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/EventForm";

async function getNGOs() {
  return prisma.nGO.findMany({
    where: { status: "APPROVED" },  // ← Changed from active: true
    orderBy: { name: "asc" },
  });
}

export default async function CreateEventPage() {
  const ngos = await getNGOs();

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Event</h1>
      <EventForm ngos={ngos} />
    </div>
  );
}