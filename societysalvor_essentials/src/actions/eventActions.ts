// src/actions/eventActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getCurrentUser() {
  const token = (await cookies()).get("auth-token")?.value;

  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return { 
      id: payload.userId, 
      role: payload.role, 
      schoolId: payload.schoolId || null 
    };
  } catch {
    return null;
  }
}

export async function createEvent(formData: FormData) {
  const user = await getCurrentUser();

  if (!user || user.role !== "SCHOOL" || !user.schoolId) {
    return { success: false, error: "Unauthorized or no school linked" };
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as "SELL" | "DONATION";
  const date = new Date(formData.get("date") as string);
  const ngoId = type === "DONATION" ? (formData.get("ngoId") as string || null) : null;

  if (!name || !type || isNaN(date.getTime())) {
    return { success: false, error: "Invalid input" };
  }

  try {
    await prisma.event.create({
      data: {
        name,
        type,
        date,
        ngoId,
        schoolId: user.schoolId,
      },
    });

    revalidatePath("/ecochamp/school/events");
    revalidatePath("/ecochamp/school");

    return { success: true };
  } catch (error) {
    console.error("Event creation error:", error);
    return { success: false, error: "Failed to create event" };
  }
}