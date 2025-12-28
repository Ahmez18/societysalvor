// src/app/api/ecochamp/validate-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const school = await prisma.school.findUnique({
    where: { code },
    select: { name: true },
  });

  if (school) {
    return NextResponse.json({ valid: true, schoolName: school.name });
  }

  return NextResponse.json({ valid: false }, { status: 404 });
}