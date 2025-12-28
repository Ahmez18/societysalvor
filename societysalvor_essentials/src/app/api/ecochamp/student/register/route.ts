// src/app/api/ecochamp/student/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const code = formData.get("code") as string;

    const school = await prisma.school.findUnique({
      where: { code },
    });

    if (!school) {
      return NextResponse.json({ error: "Invalid school code" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "STUDENT",
        schoolId: school.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}