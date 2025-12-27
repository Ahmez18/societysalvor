// src/app/api/ecochamp/join-event/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getCurrentUserId(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
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

export async function POST(req: NextRequest) {
  const studentId = await getCurrentUserId(req);
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();

  try {
    await prisma.participation.upsert({
      where: { studentId_eventId: { studentId, eventId } },
      update: {},
      create: { studentId, eventId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join" }, { status: 500 });
  }
}