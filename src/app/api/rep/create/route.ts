// src/app/api/rep/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashed,
        role: "REP",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}