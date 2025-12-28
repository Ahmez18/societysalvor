// src/app/ecochamp/school/events/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import SchoolEventList from "@/components/SchoolEventList";

async function getEvents() {
  return prisma.event.findMany({
    include: {
      ngo: true,
      orders: true,
      school: true,  // ← Added this line
    },
    orderBy: {
      date: "desc",
    },
  });
}

export default async function SchoolEventsPage() {
  const events = await getEvents();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Your EcoChamp Events
      </h1>

      <SchoolEventList events={events} />
    </div>
  );
}