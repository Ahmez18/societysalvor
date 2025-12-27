// src/app/api/vehicle/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const make = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year = Number(formData.get("year"));
    const condition = formData.get("condition") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const notes = formData.get("notes") as string;

    const lead = await prisma.vehicleScrap.create({
      data: {
        make,
        model,
        year,
        condition,
        phone,
        location,
        notes: notes || null,
        publicId: "VH" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      },
    });

    return NextResponse.json({ success: true, publicId: lead.publicId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}