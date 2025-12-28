// src/app/api/scrap-item/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const unit = formData.get("unit") as "KG" | "PIECE";
    const basePrice = parseFloat(formData.get("basePrice") as string);

    if (!name || !unit || isNaN(basePrice)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const item = await prisma.scrapItem.create({
      data: {
        name,
        unit,
        basePrice,
        active: true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Scrap item create error:", error);
    return NextResponse.json({ error: "Failed to create scrap item" }, { status: 500 });
  }
}