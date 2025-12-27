// src/app/ecochamp/student/participated/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import StudentEventList from "@/components/StudentEventList";
import { cookies } from "next/headers";

async function getCurrentStudentId() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return payload.role === "STUDENT" ? payload.userId : null;
  } catch {
    return null;
  }
}

async function getParticipatedEvents(studentId: string | null) {
  if (!studentId) return [];

  return prisma.event.findMany({
    where: {
      status: "COMPLETED",
      participations: {
        some: { studentId },
      },
    },
    include: { ngo: true, school: true },
    orderBy: { date: "desc" },
  });
}

export default async function ParticipatedEventsPage() {
  const studentId = await getCurrentStudentId();
  const events = await getParticipatedEvents(studentId);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        My Participated Events & Certificates
      </h1>

      <StudentEventList events={events} />
    </div>
  );
}