// src/app/ecochamp/school/page.tsx
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/EventForm";
import SchoolEventList from "@/components/SchoolEventList";
import Link from "next/link";


async function getData() {
  const [events, ngos] = await Promise.all([
    prisma.event.findMany({
      include: {
        ngo: true,
        orders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.nGO.findMany({
      where: { status: "APPROVED" },
      orderBy: { name: "asc" },
    }),
  ]);

  return { events, ngos };
}

export default function SchoolDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">School Dashboard - EcoChamp</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <Link href="/ecochamp/school/create-event" className="block p-8 bg-blue-600 text-white rounded-lg text-2xl hover:bg-blue-700 text-center">
          Create New Event
        </Link>

        <Link href="/ecochamp/school/events" className="block p-8 bg-green-600 text-white rounded-lg text-2xl hover:bg-green-700 text-center">
          View Events
        </Link>

        <Link href="/ecochamp/school/students" className="block p-8 bg-purple-600 text-white rounded-lg text-2xl hover:bg-purple-700 text-center">
          View Registered Students
        </Link>
      </div>
    </div>
  );
}