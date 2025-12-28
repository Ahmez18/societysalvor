// src/app/ecochamp/student/upcoming/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";

async function getCurrentStudentSchoolId() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    if (payload.role !== "STUDENT") return null;

    // Fetch schoolId from user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { schoolId: true },
    });

    return user?.schoolId || null;
  } catch {
    return null;
  }
}

async function getUpcomingEvents(schoolId: string | null) {
  if (!schoolId) return [];

  return prisma.event.findMany({
    where: {
      schoolId,
      status: "ONGOING",
    },
    include: { ngo: true },
    orderBy: { date: "asc" },
  });
}

export default async function UpcomingEventsPage() {
  const schoolId = await getCurrentStudentSchoolId();
  const events = await getUpcomingEvents(schoolId);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Upcoming Events
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Link href={`/ecochamp/event/${event.id}`} key={event.id} className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-4">{event.name}</h3>
            <p className="text-gray-600 mb-2">
              {event.type} • {event.date ? new Date(event.date).toLocaleDateString() : "Date TBD"}
            </p>
            {event.ngo && <p className="text-green-700 font-medium">Donated to {event.ngo.name}</p>}
            <p className="text-blue-600 mt-4 hover:underline">View Details & Join →</p>
          </Link>
        ))}

        {events.length === 0 && (
          <p className="text-center text-gray-500 py-12 col-span-2">
            No upcoming events for your school. Check back later!
          </p>
        )}
      </div>
    </div>
  );
}