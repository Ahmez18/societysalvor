// src/app/api/ngo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const logo = formData.get("logo") as string | null;
    const website = formData.get("website") as string | null;
    const registrationNumber = formData.get("registrationNumber") as string;
    const type = formData.get("type") as "TRUST" | "SOCIETY" | "FOUNDATION" | "OTHER";
    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!name || !description || !registrationNumber || !type || !address || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create NGO (pending)
    const ngo = await prisma.nGO.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        description,
        logo: logo || null,
        website: website || null,
        registrationNumber,
        type,
        address,
        status: "PENDING",
      },
    });

    // Create NGO user
    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        phone,
        role: "NGO",
        ngoId: ngo.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("NGO create error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email or NGO name already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create NGO" }, { status: 500 });
  }
}