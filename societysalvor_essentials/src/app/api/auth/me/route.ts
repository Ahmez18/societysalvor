// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ user: null, role: "GUEST" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null, role: "GUEST" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, phone: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ user: null, role: "GUEST" });
  }

  return NextResponse.json({ user, role: user.role });
}