// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email taken" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    // Only allow ADMIN creation via seed for now
    const allowedRoles = role === "ADMIN" ? ["ADMIN"] : ["REP", "SCHOOL", "STUDENT"];
    if (!allowedRoles.includes(role || "")) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        phone,
        role: role || "STUDENT",
      },
    });

    return NextResponse.json({ message: "User created", userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}