// src/app/ecochamp/school/students/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import StudentModal from "@/components/StudentModal";

async function getCurrentSchoolId() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    if (payload.role !== "SCHOOL") return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { schoolId: true },
    });

    return user?.schoolId || null;
  } catch {
    return null;
  }
}

async function getSchoolData(schoolId: string | null) {
  if (!schoolId) return { allStudents: [], eventsWithParticipation: [] };

  const [allStudents, events] = await Promise.all([
    prisma.user.findMany({
      where: { role: "STUDENT", schoolId },
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: { schoolId },
      include: {
        participations: {
          include: {
            student: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { date: "desc" },
    }),
  ]);

  return { allStudents, eventsWithParticipation: events };
}

export default async function RegisteredStudentsPage() {
  const schoolId = await getCurrentSchoolId();
  const { allStudents, eventsWithParticipation } = await getSchoolData(schoolId);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Registered Students & Participation
      </h1>

      {/* All Students Summary */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Total Registered Students: {allStudents.length}
        </h2>
        <p className="text-gray-600">
          Share your school code to get more students!
        </p>
      </div>

      {/* Event Cards */}
      <h2 className="text-2xl font-semibold mb-6">Event Participation</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsWithParticipation.map((event) => (
          <StudentModal key={event.id} event={event}>
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
              <h3 className="text-xl font-bold mb-3">{event.name}</h3>
              <p className="text-gray-600 mb-2">
                {event.date ? new Date(event.date).toLocaleDateString() : "Date TBD"}
              </p>
              <p className="text-gray-600 mb-4">{event.type}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">
                  {event.participations.length}
                </span>
                <span className="text-sm text-gray-500">Students Joined</span>
              </div>
              <p className="text-blue-600 mt-4 hover:underline text-center">
                Click to view list →
              </p>
            </div>
          </StudentModal>
        ))}

        {eventsWithParticipation.length === 0 && (
          <p className="text-center text-gray-500 py-12 col-span-full">
            No events created yet.
          </p>
        )}
      </div>
    </div>
  );
}