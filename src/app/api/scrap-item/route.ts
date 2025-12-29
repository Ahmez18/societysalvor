// src/app/api/scrap-items/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PUBLIC API
 * Purpose:
 * - Used by Sell Scrap
 * - Used by Donate Scrap
 *
 * Rules:
 * - Only ACTIVE items
 * - JSON-safe (Decimal → number)
 * - Stable shape
 * - NO auth
 * - NO admin logic
 */
export async function GET() {
  try {
    const items = await prisma.scrapItem.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        unit: true,
        basePrice: true,
      },
    });

    const safeItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      unit: item.unit,
      basePrice: Number(item.basePrice),
    }));

    return NextResponse.json({ items: safeItems });
  } catch (error) {
    console.error("Public scrap-items GET failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch scrap items" },
      { status: 500 }
    );
  }
}
