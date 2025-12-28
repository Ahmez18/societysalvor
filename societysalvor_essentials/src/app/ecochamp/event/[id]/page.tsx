// src/app/ecochamp/event/[id]/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import JoinEventButton from "@/components/JoinEventButton";

async function getEvent(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: { ngo: true, school: true },
  });
}

async function getCurrentStudentId() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    if (payload.role !== "STUDENT") return null;
    return payload.userId;
  } catch {
    return null;
  }
}

async function isJoined(studentId: string | null, eventId: string) {
  if (!studentId) return false;
  const participation = await prisma.participation.findUnique({
    where: { studentId_eventId: { studentId, eventId } },
  });
  return !!participation;
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  const studentId = await getCurrentStudentId();
  const joined = await isJoined(studentId, params.id);

  if (!event) {
    return <p className="text-center py-12 text-red-600">Event not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8">{event.name}</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <p><strong>Type:</strong> {event.type}</p>
        <p><strong>Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : "TBD"}</p>
        <p><strong>School:</strong> {event.school.name}</p>
        {event.ngo && <p><strong>NGO:</strong> {event.ngo.name}</p>}
        <p><strong>Status:</strong> {event.status}</p>

        <p className="text-lg text-gray-700">
          Bring your scrap to school on event day. No individual pickup needed — we collect in bulk!
        </p>

        {studentId && event.status === "ONGOING" && (
          <JoinEventButton eventId={event.id} joined={joined} />
        )}

        {joined && <p className="text-green-600 font-bold text-center">You are participating! Bring your scrap on event day.</p>}
      </div>

      <a href="/ecochamp/student/upcoming" className="block text-center text-blue-600 hover:underline mt-8">
        ← Back to Upcoming Events
      </a>
    </div>
  );
}